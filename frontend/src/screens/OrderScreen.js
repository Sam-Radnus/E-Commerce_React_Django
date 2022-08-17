import React from 'react'
import { useState, useEffect} from 'react'
import { Row, Col, ListGroup, Button, Image ,Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'
const OrderScreen = () => {
    const { id }=useParams();
    const dispatch=useDispatch();
    const orderId=id;
    //console.warn(order.isPaid);
    const orderDetails=useSelector(state=>state.orderDetails);
    const { order,loading,error}=orderDetails
    if(!loading && !error)
       order.itemsPrice=order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2);
    
    useEffect(()=>{
       // console.log(localStorage);
           if(!order || order._id!==Number(orderId))
           {
            console.log(localStorage);
            dispatch(getOrderDetails(orderId))
            console.log(localStorage);
           }
    },[order,orderId])
  
    return loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):
     (
        <div>
            <h1>Order{id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            {/* <p>
                                <strong>Shipping:</strong>
                                {order.shippingAddress.address}{order.shippingAddress.city},{order.shippingAddress.country},{order.shippingAddress.postalCode}
                            </p> */}
                             {order.isDelivered?(<Message variant='success'>Deliverd</Message>):(<Message variant='warning'>Not Delivered Yet</Message>)}
                        <p><strong>Name:</strong>{order.user.name}</p>
                        <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Payment Method:
                            </h2>
                            <p>
                                <strong>PayPal</strong>

                            </p>
                            {order.isPaid?(<Message variant='success'>Paid On {order.paidAt}</Message>):(<Message variant='warning'>Not Paid Yet</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Your Orders:
                            </h2>
                            <p>
                                {order.orderItems.length == 0 ? <Message variant='info'>
                                      Empty Order 
                                </Message> : (
                                    order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col  md={1}>
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
                            <Col>${order.itemsPrice}</Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <Row>
                            <Col>Shipping:</Col>
                            <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
    
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen