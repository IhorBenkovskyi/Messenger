import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './SignUp.css';
import profileImg from '../images/profileImg.png';
import { useState } from 'react';

const SingUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [uploadingProfileImg, setUploadingProfileImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    const vallidateImage = (e) => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024) {
            return alert('File size is too big!');
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'idjhmcvp');
        try {
            setUploadingProfileImg(true);
            let res = await fetch('https://api.cloudinary.com/v1_1/dol1nbeqz/image/upload', {
                method: 'POST',
                body: data
            });
            const urlData = await res.json();
            setUploadingProfileImg(false);
            return urlData.url;
        } catch (err) {
            setUploadingProfileImg(false);
            console.log(err);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!image) alert('Please add  your image');
        const url = await uploadImage(image);
        console.log(url);
    }
    return (
        <Container>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: '60%', maxWidth: 500 }} onSubmit={handleSignUp}>
                        <h1 className="text-center">Create account</h1>
                        <div className='signup-profile-img__container'>
                            <img src={imagePreview || profileImg} alt="profileImg" className='signup-profile-img' />
                            <label htmlFor="image-upload" className='image-upload-label'>
                                <i className="fas fa-plus-circle add-img-icon"></i>
                            </label>
                            <input id="image-upload" type="file" hidden accept='image/png, image/jpeg' className='image-upload-input' onChange={vallidateImage} />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadingProfileImg ? 'Signing you up...' : 'Sign Up'}
                        </Button>
                        <div className="py-3" >
                            <p className='text-center'>Already have an account? <Link to='/login'>Login</Link></p>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="signup__bg"></Col>
            </Row>
        </Container>
    );
};

export default SingUp;