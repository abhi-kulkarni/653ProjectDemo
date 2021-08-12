import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import {
    FaIdBadge
} from "react-icons/fa";
import '../index.css'
import { API_URL } from "../constants";
import axios from "axios";

const ManageShop = (props) => {

    const history = useHistory();
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
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
            <Form onSubmit={(e) => handleSubmit(e)}>
            <Row style={{ padding: '0px', margin: '10px 0px 0px 0px' }}>
            <Col className="breadcrumb_container" style={{ padding: '20px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Breadcrumb style={{ margin: '0px', padding: '10px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                    <Breadcrumb.Item onClick={() => redirectPage('/home')}>Account</Breadcrumb.Item>
                    <Breadcrumb.Item active> Send your customer ID</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            </Row>
            
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaIdBadge className="customer_data_section_icon"/> Send your customer ID
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body>
                                    <Card.Text>
                                    <Row style={{ margin: '0px 0px 10px 0px',padding: '0px'}}>
                                        <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <span className="customer_data_text">If your company / organization already owns a customer ID, please provide it to us in order to link it to your account.</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '0px',padding: '0px'}}>
                                        <Col style={{ margin: '0px',padding: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Row style={{ margin: '0px', padding: '0px'}}>
                                            <Col style={{ margin: '0px', padding: '0px', }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Group controlId="customer_id">
                                                <Form.Label className="float-left">Customer Id <span style={{ color: 'red'}}>*</span></Form.Label>
                                                <Form.Control
                                                    name="customer_id"
                                                    value={formData.customer_id}
                                                    onChange={(e) => handleChange(e)}
                                                    type="text"
                                                    placeholder="Enter Customer Id"
                                                    
                                                />
                                                    <Row style={{ padding: "0px", margin: "0px" }}>
                                                        <Col style={{ padding: "0px" }}>
                                                        {formErrors.customer_id && formErrors.customer_id.length > 0 && (
                                                            <span className="float-left error_message">
                                                            {formErrors.customer_id}
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
                                Submit
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
