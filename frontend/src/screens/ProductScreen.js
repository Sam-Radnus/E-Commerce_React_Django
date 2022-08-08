import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProductScreen = ({ match }) => {
    let { id } = useParams();
    const [qty, setQty] = useState(0);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    //const product=products.find((p)=> p._id == id);
    useEffect(() => {
        dispatch(listProductDetails(id));
        console.log(product);
    }, [dispatch])
    const addtoCartHandler=()=>{
         navigate(`/cart/${id}/qty=${qty}`)
    }
    return (
        <div>
            {console.log(product)}
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :

                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} />
                    </Col>
                    <Col md={3}>
                        <ListGroup >
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <h3>Price:£{product.price}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>{product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>£{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control
                                                    as="Select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                   {
                                                    [...Array(product.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                    ))
                                                   }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className='btn-block' onClick={addtoCartHandler} disabled={product.countInStock > 0 ? false : true} type='button'>Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default ProductScreen