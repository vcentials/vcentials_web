import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from 'react-router-dom';
import Login from '../Login/Login.jsx'

 function Registration(){

    return(
        <>
        <div  className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>
                        <div  className="text-center">
                            <h1>Create an Account</h1>
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username*</Form.Label>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>VCID</Form.Label>
                                <Form.Control type="text" placeholder="VCID" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password*</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Button variant="danger" type="submit">
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