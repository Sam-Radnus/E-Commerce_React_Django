import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Button, Image, ListGroupItem ,Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutState from '../components/CheckoutState'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
const PlaceOrderScreen = () => {
    const orderCreate=useSelector(state=>state.orderCreate);
    const { order,success,error}=orderCreate
    const cart = useSelector(state => state.cart)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const PlaceOrder=()=>{
        console.log("Order Placed");
       
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
        }))
    }
    useEffect(()=>{
        if(success)
        {
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[success])
    cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2);
    cart.shippingPrice=(cart.itemsPrice<100?0:10).toFixed(2);
    cart.taxPrice=Number((0.082)*cart.itemsPrice).toFixed(2);
    cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2);
    return (
        <div>
            <CheckoutState step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p>
                                <strong>Shipping:</strong>
                                {cart.shippingAddress.address}{cart.shippingAddress.city},{cart.shippingAddress.country},{cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Payment Method:
                            </h2>
                            <p>
                                <strong>PayPal</strong>

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Your Cart:
                            </h2>
                            <p>
                                {cart.cartItems.length == 0 ? <Message variant='info'>
                                    Your Cart is Empty
                                </Message> : (
                                    cart.cartItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}x${item.price}=${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                )}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Col>Items:</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <Button
                             type='button'
                             className='btn-block'
                             disabled={cart.cartItems === 0 }
                             onClick={PlaceOrder}
                             >
                            Place Order
                           </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen