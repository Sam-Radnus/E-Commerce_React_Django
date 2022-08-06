from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .products import products
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import authentication, permissions
from .serializers import *
from .models import Product
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return JsonResponse(routes,safe=False)
@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)#many indicated whether we are serializing multiple objects or not    
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)    