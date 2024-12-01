import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from 'react-router-dom';
import { useState } from 'react';
import {auth} from '../firebase.js'
import { sendPasswordResetEmail } from 'firebase/auth';



 function ForgotPassword(){

    const [resetEmail, setResetEmail] = useState("");

    const reset = async(e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          alert("email sent");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return(
        <>
        <div  className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>
                        <div  className="text-center">
                            <h1>Forgot password?</h1>
                            
                        </div>

                        <Form onSubmit={(e)=>reset(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" placeholder="Email" onChange={(event) => {setResetEmail(event.target.value)}}/>
                            </Form.Group>

                            <Button variant="danger" type="submit">
                               Submit
                            </Button>
                            
                        </Form>
                        <div className="mt-3">
                            <div className="mt-5">
                                <Link to='/login'><a href="#">Return to login</a></Link>
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