import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { AppContext } from '../context/appContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser({ email, password }).then((data) => {
            if (data) {
                console.log(data);
                // socket will be here
                socket.emit('new-user');
                navigate('/chat');
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="login__bg"></Col>
                <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: '60%', maxWidth: 500 }} onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className="py-4">
                            <p className='text-center'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default Login