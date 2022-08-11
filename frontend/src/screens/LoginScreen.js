import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { loginUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch=useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('login ');
        console.log(email);
        console.log(password);
    
        dispatch(loginUser(email,password))
        if(error)
           navigate('/');
    }
   
    const userLogin = useSelector(state => state.userLogin)
    const { error,loading,userInfo } = userLogin;
    const navigate = useNavigate();
    useEffect(()=>{
       if(userInfo)
       {
        navigate('/');
       }
    },[userInfo])
    return (

        <FormContainer>
            <h1>Log-In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign-In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?<Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>

    )
}

export default LoginScreen