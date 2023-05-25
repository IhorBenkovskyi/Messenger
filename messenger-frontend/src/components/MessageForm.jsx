import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './MessageForm.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);
    const { socket, currentRoom, setMessages, messages, privatMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off('room-messages').on('room-messages', (roomMessages) => {
        console.log('room-messages', roomMessages);
        setMessages(roomMessages);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    };


    return (
        <div>
            {/* <div className="messages-output">{!user && <div className='alert alert-danger' >Please login</div>}</div> */}
            <div className="messages-output">
                {user && !privatMemberMsg?._id && <div className="alert alert-info">You are in the {currentRoom} room</div>}
                {user && privatMemberMsg?._id && (
                    <>
                        <div className="alert alert-info conversation-info">
                            <div>
                                Your conversation with {privatMemberMsg.name} <img src={privatMemberMsg.picture} className="conversation-profile-pic" />
                            </div>
                        </div>
                    </>
                )}
                {!user && <div className="alert alert-danger">Please login</div>}

                {user &&
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx}>
                            <p className="alert alert-info text-center message-date-indicator">{date}</p>
                            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                                <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                    <div className="message-inner">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                        </div>
                                        <p className="message-content">{content}</p>
                                        <p className="message-timestamp-left">{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                <div ref={messageEndRef} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder='Your message' disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button type='submit' variant='primary' style={{ width: '100%', backgroundColor: 'orange' }} disabled={!user}>
                            <i className='fas fa-paper-plane'></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default MessageForm;