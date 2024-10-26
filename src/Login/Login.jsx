import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

 function Login(){

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
                                <Form.Label>Username*</Form.Label>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="danger" type="submit">
                                Login
                            </Button>
                            
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