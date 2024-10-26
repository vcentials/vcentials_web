import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../NavBar/NavBar.jsx'
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

function Profile(){

    //Sets up the states for disabling and enabling the form inputs
    const [isDisabled, setIsDisabled] = useState(true);
    //Sets up the states for sowing and hiding the save and cancel buttons
    const [show, setShow] = useState(true);


 
    //Function to handle the click event on the edit can cancel buttons
    const handleClick = (x) => {

        x.preventDefault();
    
        setIsDisabled(!isDisabled);
        setShow(!show)
    };

    return(

        <>
       <NavBar/>
        <div className="mt-5">
            <Container>

                <Row className='d-flex justify-content-center'>
                    <Col md='6'>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value="Username" disabled/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Reset Password
                            </Button>

                            <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value="example@gmail.com" disabled={isDisabled}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>VCID</Form.Label>
                                <Form.Control type="email" disabled={isDisabled}/>
                            </Form.Group>

                            <div>
                                {!show && <Button variant="danger" typr="submit" className="me-3">Save</Button>}

                                <Button variant="primary" type="submit" onClick={handleClick}>
                                    {show ? "Edit" : "Cancel"}
                                </Button>
                                


                            </div>

                            
                        </Form>
                     
                    </Col>
                </Row>

            </Container>

         </div>
        </>
    );
}

export default Profile