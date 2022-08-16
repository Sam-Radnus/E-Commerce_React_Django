import React from 'react'
import  { useState, useEffect } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import CheckoutState from '../components/CheckoutState'
import { saveShippingAddress} from '../actions/cartActions'
const ShippingScreen = () => {
    const navigate=useNavigate();
    
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    const { shippingAddress} =cart;
    const [city,setCity]=useState(shippingAddress.city);
    const [address,setAddress]=useState(shippingAddress.address);
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log('Submitted');
        dispatch(saveShippingAddress({address,city,postalCode,country}));
        console.log('navigate');
        navigate('/payment');
        console.log('navigated');
    }
    return (
    <FormContainer>
        <CheckoutState step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                    <Form.Label>Enter your Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter address'
                        value={address?address:''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Enter your city</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter city'
                        value={city?city:''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Postal Code'>
                    <Form.Label>Enter your Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter Postal Code'
                        value={postalCode?postalCode:''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Enter your country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter country'
                        value={country?country:''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen