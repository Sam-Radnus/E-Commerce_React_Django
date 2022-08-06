import React, { useState,useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = ({match}) => {
    let { id } = useParams(); 

     //const product=products.find((p)=> p._id == id);
     const [product,setProduct]=useState([]);
     useEffect(()=>{
        async  function fetchProduct(){
            const {data}=await axios(`/api/products/${id}`)
            setProduct(data);
          }
          fetchProduct();
     })
  return (
    <div> 
    {console.log(product)}
     <Link to='/' className='btn btn-light my-3'>Go Back</Link>
     <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name}/>
        </Col>
        <Col md={3}>
            <ListGroup >
               <ListGroup.Item>
                <h3>{product.name}</h3>
               </ListGroup.Item>
          
        
               <ListGroup.Item>
               <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
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
                         <strong>{product.countInStock>0 ?'In Stock':'Out of Stock'}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn-block' disabled={product.countInStock>0 ?false:true} type='button'>Add to Cart</Button>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
     </Row>
    </div>
  )
}

export default ProductScreen