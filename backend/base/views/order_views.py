from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import authentication,status
from base.serializers import *
from base.models import Product,Order,OrderItem,ShippingAddress
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import make_password

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user=request.user
    data=request.data
    orderItems=data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1 create order
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        print(data)
        # 2 create shipping address
        shipping=ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            #shippingPrice=data['shippingAddress']['shippingPrice']
        )
        # 3 create order items and set order to order item relation ship
        for i in orderItems:
            product=Product.objects.get(_id=i['product'])
            print(product)
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # 4 update stock    
            product.countInStock-=int(item.qty)
            product.save()
        serializer=OrderSerializer(order,many=False)      
        return Response(serializer.data)
