import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';

const Home = () => {
    return (
        <Row className="justify-content-md-center">
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                <div>
                    <h1 className="text-center">Welcome to Messenger</h1>
                    <p className="text-center">Chat App - shoot me a message</p>
                    <LinkContainer to="/chat">
                        <Button variant="success">Get Started <i className='fas fa-comments home-message-icon'></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
            <Col md={6} className='home__bg'></Col>
        </Row>
    );
};

export default Home;