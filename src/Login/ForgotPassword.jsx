import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css"

 function ForgotPassword(){

    return(
        <>
        <div  className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>
                        <div  className="text-center">
                            <h1>Forgot password?</h1>
                            
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>

                            <Button variant="danger" type="submit">
                               Submit
                            </Button>
                            
                        </Form>
                        <div className="mt-3">
                            <div className="mt-5">
                                <a href="#">Return to login</a>
                            </div>
                        </div>
                       
                        
                    </Col>
                </Row>

                </Container>
        </div>


        </>
    )
 }

 export default ForgotPassword