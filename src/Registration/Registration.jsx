import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate, redirect} from 'react-router-dom';
import {useState} from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase.js'


 function Registration(){



    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if(!registerEmail || !registerPassword || !confirmPassword){
            return setError("Please enter valid email or password")
        } if (registerPassword !== confirmPassword) {
            return setError("Passwords do not match");
        } else {
            {
                try {
                    setError('');
                    setLoading(true);
                    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
                    navigate("/login");
                    console.log(user);
                } catch (error) {
                    setError("Failed to create an account");
                    console.log(error.message);
                }
                setLoading(false)
            }
    }
}

    return(
        <>
        <div  className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>
                        <div  className="text-center">
                            <h1>Create an Account</h1>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUser">
                                <Form.Label>Username*</Form.Label>
                                <Form.Control type="text" placeholder="Username" disabled/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicVCID">
                                <Form.Label>VCID</Form.Label>
                                <Form.Control type="text" placeholder="VCID" disabled/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="email" onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password*</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password"  onChange={(event) => {setConfirmPassword(event.target.value)}}/>
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>}
                            
                                <Button disabled={loading} variant="danger" type="submit">
                                    Sign Up
                                </Button>
                            
                            
                        </Form>
                        <div className="mt-3">
                            <div>
                                <Link to="/login"><a href="ForgotPassword.jsx">Already have an account? Login here</a></Link>
                            </div>

                        </div>
                       
                        
                    </Col>
                </Row>

                </Container>
        </div>


        </>
    )
 }

 export default Registration