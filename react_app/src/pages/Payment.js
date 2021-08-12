import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import {
    FaShoppingCart,
    FaFileAlt,
    FaInfoCircle,
    FaCreditCard
} from "react-icons/fa";
import '../index.css'
import { API_URL } from "../constants";
import axios from "axios";
import PaymentCard from "../components/stripe/PaymentCard";

const Payment = (props) => {

    const history = useHistory();
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
    const [accordionToggle, setAccordionToggle] = useState(false);
    const paymentCardRef = useRef();
    const [formErrors, setFormErrors] = useState({
        customer_id: ""
    });
    const [formData, setFormData] = useState({
        customer_id: ""
    });

    const redirectPage = (page) => {
        history.push(page);
    }

    const formValid = (formErrors, formData) => {
        let valid = true;
        // validate form errors being empty
        Object.values(formErrors).forEach((val) => {
          val.length > 0 && (valid = false);
        });
        // validate the form was filled out
        Object.values(formData).forEach((val) => {
          val === null && (valid = false);
        });
        return valid;
      };
    
    const toggleAccordion = () => {
        setAccordionToggle(!accordionToggle);
    }

    const handleSubmit = (e) => {
        let post_data = {};
        let valid = false;
        e.preventDefault();
        if (formValid(formErrors, formData)) {
            valid = true;
            post_data = formData;
        } else {
            valid = false;
            setSignUpSuccessMsg("Some of your fields are empty or incorrect");
            setTimeout(function () {
                setSignUpSuccessMsg("");
            }, 10000);
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
        if (valid) {
          axios
            .post(API_URL + "get_company_licenses/", post_data)
            .then((response) => {
              if (response.data.ok) {
                //
              } else {
                setSignUpSuccessMsg(response.data.error);
                setTimeout(function () {
                  setSignUpSuccessMsg("");
                }, 10000);
                console.log("Error");
              }
            })
            .catch((error) => {
              setSignUpSuccessMsg("Some error Occurred");
              setTimeout(function () {
                setSignUpSuccessMsg("");
              }, 10000);
              console.log(error);
            });
        }
      };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        validate(name, value);
      };
    
      const validate = (name, value) => {
        switch (name) {
          case "customer_id":
            setFormData({ ...formData, customer_id: value });
            if (value.length <= 0) {
              setFormErrors({
                ...formErrors,
                customer_id: "Customer Id is required",
              });
            } else {
              setFormErrors({ ...formErrors, customer_id: "" });
            }
            break;
          default:
            break;
        }
      };

    return (
        <Container style={{ paddingBottom: '60px' }}>
            <Row style={{ padding: '0px', margin: '10px 0px 0px 0px' }}>
            <Col className="breadcrumb_container" style={{ padding: '20px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Breadcrumb style={{ margin: '0px', padding: '10px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                    <Breadcrumb.Item onClick={() => redirectPage('/home')}>Account</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => redirectPage('/home/order')}>Order</Breadcrumb.Item>
                    <Breadcrumb.Item active>Payment</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaShoppingCart className="payment_cart_section_icon"/> Your Cart
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body style={{ padding: '10px'}}>
                                    <div className="card-text">
                                        <Row style={{ margin: '5px 0px',padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-left">Product</div>
                                            </Col>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-right">Price (CHF)</div>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '5px 0px',padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className="float-left">
                                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>1</span><span style={{ fontSize: '0.9rem' }}> x Storlytics Trial subscription</span>
                                                </div>
                                            </Col>
                                            <Col style={{ margin: '0px',padding: '3px 5px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-right">
                                                    Free
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '5px 0px',padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className="float-left">
                                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>2</span><span style={{ fontSize: '0.9rem' }}> x Storlytics Full subscription</span>
                                                </div>
                                            </Col>
                                            <Col style={{ margin: '0px',padding: '3px 5px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-right">
                                                    200
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '5px 0px',padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className="float-left">
                                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>1</span><span style={{ fontSize: '0.9rem' }}> x Storlytics Premium subscription</span>
                                                </div>
                                            </Col>
                                            <Col style={{ margin: '0px',padding: '3px 5px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-right">
                                                    200
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr style={{ margin: '5px' }} />
                                        <Row style={{ margin: '5px 0px',padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className="float-left">
                                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Total</span>
                                                </div>
                                            </Col>
                                            <Col style={{ margin: '0px',padding: '3px 5px'}} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }} className="float-right">
                                                    400
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaFileAlt className="payment_billing_section_icon"/> Billing Information
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body style={{ padding: '20px'}}>
                                    <div className="card-text">
                                        <Row style={{ margin: '5px 0px 15px 0px', padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div style={{ fontSize: '0.9rem' }} className="float-left">
                                                    Company/Organization : <b> Organization Name </b>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '5px 0px 15px 0px', padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div style={{ fontSize: '0.9rem' }} className="float-left">
                                                    Country : <b> India </b>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '5px 0px 15px 0px', padding: '0px'}}>
                                            <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div style={{ fontSize: '0.9rem' }} className="float-left">
                                                    City : <b> Delhi </b>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button onClick={() => redirectPage('/home/modify_profile/1')} size="sm" variant="outline-primary">
                                            Modify Billing Information <FaFileAlt className="payment_modify_billing_section_icon"/> 
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaInfoCircle className="payment_subscription_section_icon"/>  Subscription period
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body style={{ padding: '10px 20px', textAlign: 'left' }}>
                                    <Card.Text className="payment_subscription_info_text">
                                        <div style={{ marginBottom: '10px' }}>
                                            New licenses subscriptions start on the day the activation keys are delivered. If you already own Storlytics licenses and pay by card, you will receive the new licenses as soon as we receive the payment.
                                        </div>
                                        <div>
                                            Subscription renewals become effective as soon as we receive the payment.
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>    
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Accordion style={{ margin: '0px', padding: '0px' }} defaultActiveKey="0">
                    <Card style={{ border: '1px solid lightgray' }}>
                        <Card.Header style={{ border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: accordionToggle?'1px solid lightgray':'none', margin: '0px', padding: '0px' }}>
                            <Accordion.Toggle className="payment_accordion_header" onClick={() => toggleAccordion()} as={Card.Header} variant="link" eventKey="0">
                                <FaCreditCard className="payment_card_section_icon"/> 
                                <span style={{ fontSize: '0.9rem' }}> Means of payment</span>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body style={{ margin: '0px', padding: '0px 0px 20px 0px' }}>
                            <Row style={{ fontSize: '0.85rem', padding: '0px', margin: '0px' }}>
                                <Col style={{ margin: '0px 0px 20px 0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span className="order_subs_text">Enter Your Card Details</span>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={3} lg={3} xl={3}></Col>
                                <Col style={{ paddingBottom: '20px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <PaymentCard ref={paymentCardRef}/>   
                                </Col>
                            </Row>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </Col>
            </Row>
            {/* <Row className="shadow-lg" style={{ margin: '0px 20px', padding: '0px', border: '1px solid lightgray' }}>
                <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Button className="float-left" onClick={() => redirectPage('/home')} size="sm" variant="primary">
                        Back
                    </Button>        
                </Col>
                <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Button onClick={() => redirectPage('/home/payment')} className="float-right" size="sm" variant="success">
                        Pay
                    </Button>   
                </Col>
            </Row> */}
        </Container>
    );
}

export default withRouter(Payment);
