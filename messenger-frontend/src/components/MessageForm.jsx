import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './MessageForm.css';

const MessageForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <div className="messages-output"></div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder='Your message'>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button type='submit' variant='primary' style={{ width: '100%', backgroundColor: 'orange' }}>
                            <i className='fas fa-paper-plane'></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default MessageForm;