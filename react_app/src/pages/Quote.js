import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup";
import {
    FaEnvelope
} from "react-icons/fa";
import '../index.css'
import { API_URL } from "../constants";
import axios from "axios";

const ManageShop = (props) => {

    const history = useHistory();
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        quote: ""
    });
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        quote: ""
    });

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

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
            .post(API_URL + "send_quote/", post_data)
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
            case "first_name":
                setFormData({ ...formData, first_name: value });
                if (value.length <= 0) {
                    setFormErrors({
                        ...formErrors,
                        first_name: "First Name is required",
                    });
                } else {
                    setFormErrors({ ...formErrors, first_name: "" });
                }
                break;
            case "last_name":
                setFormData({ ...formData, last_name: value });
                if (value.length <= 0) {
                    setFormErrors({
                        ...formErrors,
                        last_name: "First Name is required",
                });
                } else {
                    setFormErrors({ ...formErrors, last_name: "" });
                }
                break;
            case "email":
                setFormData({ ...formData, email: value });
                if (emailRegex.test(value)) {
                    setFormErrors({ ...formErrors, email: "" });
                } else {
                    if (value.length > 0) {
                    setFormErrors({ ...formErrors, email: "Invalid email address" });
                    } else {
                    setFormErrors({ ...formErrors, email: "" });
                    }
                }
                break;
            case "quote":
                setFormData({ ...formData, quote: value });
                if (value.length <= 0) {
                    setFormErrors({
                        ...formErrors,
                        quote: "Quote is required",
                    });
                } else {
                    setFormErrors({ ...formErrors, quote: "" });
                }
                break;
          default:
            break;
        }
      };

    return (
        <Container style={{ paddingBottom: '60px' }}>
            <Form onSubmit={(e) => handleSubmit(e)}>
            <Row style={{ padding: '0px', margin: '10px 0px 0px 0px' }}>
            <Col className="breadcrumb_container" style={{ padding: '20px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Breadcrumb style={{ margin: '0px', padding: '10px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                    <Breadcrumb.Item onClick={() => redirectPage('/home')}>Account</Breadcrumb.Item>
                    <Breadcrumb.Item active>Quote</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            </Row>
            
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
            <Col style={{ margin: '0px',padding: '0px'}} xs={0} sm={0} md={0} lg={3} xl={3}></Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaEnvelope className="quote_section_icon"/> Request a quote
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body>
                                    <Card.Text>
                                    <Row style={{ margin: '0px',padding: '0px'}}>
                                        <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Row style={{ margin: '0px', padding: '0px'}}>
                                                <Col style={{ margin: '0px', padding: '0px', }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Group controlId="first_name">
                                                        <Form.Label className="float-left">First Name<span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <Form.Control
                                                            name="first_name"
                                                            value={formData.first_name}
                                                            onChange={(e) => handleChange(e)}
                                                            type="text"
                                                            placeholder="Enter First Name"
                                                            
                                                        />
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                            <Col style={{ padding: "0px" }}>
                                                            {formErrors.first_name && formErrors.first_name.length > 0 && (
                                                                <span className="float-left error_message">
                                                                {formErrors.first_name}
                                                                </span>
                                                            )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '0px', padding: '0px'}}>
                                                <Col style={{ margin: '0px', padding: '0px', }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Group controlId="last_name">
                                                        <Form.Label className="float-left">First Name<span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <Form.Control
                                                            name="last_name"
                                                            value={formData.last_name}
                                                            onChange={(e) => handleChange(e)}
                                                            type="text"
                                                            placeholder="Enter Last Name"
                                                            
                                                        />
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                            <Col style={{ padding: "0px" }}>
                                                            {formErrors.last_name && formErrors.last_name.length > 0 && (
                                                                <span className="float-left error_message">
                                                                {formErrors.last_name}
                                                                </span>
                                                            )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '0px', padding: '0px'}}>
                                                <Col style={{ margin: '0px', padding: '0px', }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Group controlId="email">
                                                    <Form.Label className="float-left">Email address <span style={{ color: 'red'}}>*</span></Form.Label>
                                                    <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="email_prepend">@</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter email"
                                                        value={formData.email}
                                                        onChange={(e) => handleChange(e)}
                                                        required
                                                    ></Form.Control>
                                                    </InputGroup>
                                                    <Row style={{ padding: "0px", margin: "0px" }}>
                                                    <Col style={{ padding: "0px" }}>
                                                        {formErrors.email && formErrors.email.length > 0 && (
                                                        <span className="float-left error_message">
                                                            {formErrors.email}
                                                        </span>
                                                        )}
                                                    </Col>
                                                    </Row>
                                                </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '0px', padding: '0px'}}>
                                                <Col style={{ margin: '0px', padding: '0px', }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Group controlId="quote">
                                                        <Form.Label className="float-left">Quote<span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <Form.Control
                                                            name="quote"
                                                            value={formData.quote}
                                                            onChange={(e) => handleChange(e)}
                                                            as="textarea"
                                                            placeholder="Enter your quote"
                                                            
                                                        />
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                            <Col style={{ padding: "0px" }}>
                                                            {formErrors.quote && formErrors.quote.length > 0 && (
                                                                <span className="float-left error_message">
                                                                {formErrors.quote}
                                                                </span>
                                                            )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    <Row className="shadow-lg" style={{ margin: '10px 0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Button className="float-left" onClick={() => redirectPage('/home')} size="sm" variant="primary">
                            Back
                        </Button>        
                        </Col>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Button type="submit" className="float-right" size="sm" variant="success">
                                Send your quote
                        </Button>   
                        </Col>
                    </Row>
                    {!signUpSuccessMsg ? (
                    ""
                    ) : (
                    <Row style={{ margin: "10px 0px 0px 0px", padding: "0px" }}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div
                            style={{ display: "table", margin: "0 auto" }}
                            className="form_error_message"
                        >
                            {signUpSuccessMsg}
                        </div>
                        </Col>
                    </Row>
                    )}
                </Col>
            </Row>
        </Form>
        </Container>
    );
}

export default withRouter(ManageShop);
