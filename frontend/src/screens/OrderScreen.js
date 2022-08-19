import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants';
const OrderScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const orderId = id;
    const [sdk, setSDKready] = useState(false);
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    //console.warn(order.isPaid);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails
    if (!loading && !error)
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    //client id:-AcNXn3F8rP0AKkVFMrQDzQZA0p6Fz3T4xtEiqzoUnZwq19tQu1SzlSVQIwdYfrsZeXBaJUU7mnwEuJ2A

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcNXn3F8rP0AKkVFMrQDzQZA0p6Fz3T4xtEiqzoUnZwq19tQu1SzlSVQIwdYfrsZeXBaJUU7mnwEuJ2A'
        script.async = true
        script.onload = () => {
            setSDKready(true);
        }
        document.body.appendChild(script);
    }
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }
    useEffect(() => {
        // console.log(localStorage);
        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))

        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            }
            else {
                setSDKready(true);
            }
        }
    }, [dispatch, order, orderId])

    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
        (
            <div>
                <h1>Order{orderId}</h1>
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
                                {order.isDelivered ? (<Message variant='success'>Deliverd</Message>) : (<Message variant='warning'>Not Delivered Yet</Message>)}
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
                                {order.isPaid ? (<Message variant='success'>Paid On {order.paidAt}</Message>) : (<Message variant='warning'>Not Paid Yet</Message>)}
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
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {
                                        !sdk ? (<Loader />) : <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}

                                        />
                                    }
                                </ListGroup.Item>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}

export default OrderScreen