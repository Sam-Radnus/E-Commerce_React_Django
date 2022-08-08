import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart , removeFromCart } from '../actions/cartActions'
import { useParams } from 'react-router-dom'
const CartScreen = ({ match, location }) => {
  // const productId=match.params.id;
  // const qty=location.search?location.search.split('='):1;
  // console.log(qty);
  const navigate=useNavigate();
  const { id, qty } = useParams();
  console.log("id:" + id);
  console.log("qty:" + qty);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])
  const removeFromCartHandler=(id)=>{
       console.log('removed'+id);
       dispatch(removeFromCart(id));
  }
  const checkOutHandler=()=>{
     navigate('/login')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shipping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your Cart is Empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup >
            {
              cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        as="Select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
                      >
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button type='button' onClick={()=>removeFromCartHandler(item.product)} variant='light'> <i className='fas fa-trash'></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>SubTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)})items</h2>
             <h1> ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
            <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkOutHandler}>
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
          </ListGroup>
          
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen