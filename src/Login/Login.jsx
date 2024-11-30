import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';

import {auth} from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';

 function Login(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return(


        <>
        <div  className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>
                        <div  className="text-center">
                            <h1>VCentials Temperature Recorder</h1>
                            <h3>Log in</h3>
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control type="text" placeholder="Email" onChange={(event) => {setLoginEmail(event.target.value)}} required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => {setLoginPassword(event.target.value)}} required/>
                            </Form.Group>
                            <Link to="/">
                                <Button variant="danger" type="submit" onClick={login}>
                                Login
                                </Button>
                            </Link>

                            
                        </Form>
                        <div className="mt-3">
                            <div>
                               
                                <Link to="/forgotpassword">Forgot Password</Link>
                            </div>
                            <div className="mt-5">
                                
                                <Link to="/Registration">Create an account</Link>
                            </div>
                        </div>
                       
                        
                    </Col>
                </Row>

                </Container>
        </div>


        </>
    )
 }

 export default Login