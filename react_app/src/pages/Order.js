import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import {
    FaIdBadge,
    FaComments,
    FaInfoCircle,
    FaShoppingCart,
    FaPlus,
    FaMinus
} from "react-icons/fa";
import '../index.css'
import '../static/css/custom.css'
import { API_URL } from "../constants";
import axios from "axios";
import $ from 'jquery'

const Order = (props) => {

    const history = useHistory();
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
    const [total, setTotal] = useState(0);
    const [accordionToggle, setAccordionToggle] = useState(false);
    const [formErrors, setFormErrors] = useState({
        trial: 0,
        unit_trial:100,
        unit_full:200,
        unit_premium:500,
        full:0,
        premium:0,
        total_trial:0,
        total_full:0,
        total_premium:0,
    });
    const [formData, setFormData] = useState({
        trial: 0,
        full:0,
        premium:0,
        unit_trial:0,
        unit_full:100,
        unit_premium:200,
        total_trial:0,
        total_full:0,
        total_premium:0,
    });

    useEffect(() => {
        // pass
    }, [])

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
        post_data = formData;
        axios
        .post(API_URL + "manage_pricing/", post_data)
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
    };
    
    const managePayment = (type, action, change_data) => {

        let temp = {...formData};
        let new_total_full = temp.total_full;
        let new_total_premium = temp.total_premium;

        let curr_quantity = 0;

        if(change_data){
            curr_quantity = parseInt(change_data);
        }else{
            curr_quantity = temp[type];
            if(action === 'add'){
                curr_quantity += 1;
            }else{
                curr_quantity -= 1
            }
            if(curr_quantity <= 0){
                curr_quantity = 0;
            }else if(curr_quantity > 10){
                curr_quantity = 10;
            }
        }

        if(type === 'trial'){
            setFormData({...formData, trial: curr_quantity, total_trial: 0});
        }else if(type === 'full'){
            new_total_full = formData.unit_full * curr_quantity;
            setFormData({...formData, full: curr_quantity, total_full: new_total_full});
        }else{
            new_total_premium = formData.unit_premium * curr_quantity;
            setFormData({...formData, premium: curr_quantity, total_premium: new_total_premium});
        }
        let new_total = new_total_full + new_total_premium;
        setTotal(new_total);
    }

    const toggleAccordion = () => {
        setAccordionToggle(!accordionToggle);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        validate(name, value);
        managePayment(name, null, value);
      };
    
      const validate = (name, value) => {
        switch (name) {
          case "trial":
            setFormData({ ...formData, trial: value });
            break;
        case "full":
            setFormData({ ...formData, full: value });
            break;
        case "premium":
            setFormData({ ...formData, premium: value });
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
                    <Breadcrumb.Item active> Order </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            </Row>
            
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaIdBadge className="home_section_icon"/> Customer Id
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Text>
                                    <span className="order_summary_text">If your company / organization already owns a customer ID, please provide it to us in order to link it to your account.</span>
                                </Card.Text>
                                <Button onClick={() => redirectPage('/home/customer-data')} size="sm" variant="outline-secondary">
                                    Provide your customer ID <FaComments className="order_license_section_inner_icon"/> 
                                </Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="shadow-lg" style={{ margin: '10px 0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaShoppingCart className="order_cart_section_icon"/> Your Cart
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Accordion style={{ margin: '0px', padding: '0px' }}>
                                <Card style={{ border: 'none' }}>
                                    <Card.Header style={{ border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: accordionToggle?'1px solid lightgray':'none', margin: '0px', padding: '0px' }}>
                                    <Accordion.Toggle style={{ padding: '10px 8px' }} onClick={() => toggleAccordion()} as={Card.Header} variant="link" eventKey="0">
                                        <FaInfoCircle className="order_pricing_section_icon"/> 
                                        <span style={{ fontSize: '0.9rem' }}>Click to View Pricing</span>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row style={{ fontSize: '0.85rem', padding: '15px 0px', margin: '0px' }}>
                                        <Col style={{ color: 'gray', padding: '10px 20px', margin: '0px' }} xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Card style={{ borderRadius: '20px' }}>
                                            <Card.Body style={{ padding: '10px 0px 0px 0px'}}>
                                                <Card.Title style={{ marginBottom: '5px', color: '#0879FA', textAlign: 'center' }}>Trial</Card.Title>
                                                <div className="card-text">
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Validity
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>1 month</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Number of Runs
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>50</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Software Support
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>None</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            System Design Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>None</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Purchase Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Free</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Monthly Fee
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Free</h6>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        </Col>
                                        <Col style={{ color: 'gray', padding: '10px 20px', margin: '0px' }} xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Card style={{ borderRadius: '20px' }}>
                                            <Card.Body style={{ padding: '10px 0px 0px 0px'}}>
                                                <Card.Title style={{ marginBottom: '5px', color: '#0879FA', textAlign: 'center' }}>Full</Card.Title>
                                                <div className="card-text">
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Validity
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>1 year, extendable</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Number of Runs
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Unlimited</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Software Support
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>None</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            System Design Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>None</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Purchase Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>$500</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Monthly Fee
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>$100</h6>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                        <Col style={{ color: 'gray', padding: '10px 20px', margin: '0px' }} xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Card style={{ borderRadius: '20px' }}>
                                            <Card.Body style={{ padding: '10px 0px 0px 0px'}}>
                                                <Card.Title style={{ marginBottom: '5px', color: '#0879FA', textAlign: 'center' }}>Premium</Card.Title>
                                                <div className="card-text">
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Validity
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>1 year, extendable</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Number of Runs
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Unlimited</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Software Support
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Yes</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            System Design Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>Yes</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Purchase Cost
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>$1000</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ height: '30px', padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', backgroundColor: '#F5F5F5', padding: '5px', margin: '0px' }}>
                                                            Monthly Fee
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ padding: '0px', margin: '0px' }}>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center', padding: '5px', margin: '0px' }}>
                                                            <h6>$200</h6>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        </Col>
                                    </Row>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div style={{ textAlign: 'center' }}>
                                <span className="order_subs_text">New Subscriptions</span>
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px'}}>
                        <Table style={{ margin: '0px', color: 'gray', fontSize: '0.85rem' }} responsive striped bordered>
                            <tbody>
                                <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    <td>Type</td>
                                    <td>Unit Price(CHF)</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Trial</span>
                                    </td>
                                    <td>
                                        <span>Free</span>
                                    </td>
                                    <td>
                                        <Row style={{ margin: '0px', padding: '0px'}}>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaMinus onClick={() => managePayment("trial", "subtract")} className="order_minus_icon"/>
                                            </Col>
                                            <Col className="order_table_form_group_col" xs={12} sm={12} md={12} lg={2} xl={2} style={{ margin: '0px', padding: '0px'}}>
                                                <Form.Group className="input_table" controlId="trial">
                                                    <Form.Control name="trial"
                                                        className="trial_input"
                                                        value={formData.trial}
                                                        min="0"
                                                        max="10"
                                                        onChange={(e) => handleChange(e)}
                                                        type="number"/>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaPlus onClick={() => managePayment("trial", "add")} className="order_plus_icon"/>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        Free
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Full</span>
                                    </td>
                                    <td>
                                        <span>100</span>
                                    </td>
                                    <td>
                                        <Row style={{ margin: '0px', padding: '0px'}}>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaMinus onClick={() => managePayment("full", "subtract")} className="order_minus_icon"/>
                                            </Col>
                                            <Col className="order_table_form_group_col" xs={12} sm={12} md={12} lg={2} xl={2} style={{ margin: '0px', padding: '0px'}}>
                                                <Form.Group className="input_table" controlId="full">
                                                    <Form.Control name="full"
                                                        className="full_input"
                                                        value={formData.full}
                                                        min="0"
                                                        max="10"
                                                        onChange={(e) => handleChange(e)}
                                                        type="number"/>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaPlus onClick={() => managePayment("full", "add")} className="order_plus_icon"/>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        {formData.total_full}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Premium</span>
                                    </td>
                                    <td>
                                        <span>200</span>
                                    </td>
                                    <td>
                                        <Row style={{ margin: '0px', padding: '0px'}}>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaMinus onClick={() => managePayment("premium", "subtract")} className="order_minus_icon"/>
                                            </Col>
                                            <Col className="order_table_form_group_col" xs={12} sm={12} md={12} lg={2} xl={2} style={{ margin: '0px', padding: '0px'}}>
                                                <Form.Group className="input_table" controlId="premium">
                                                    <Form.Control name="premium"
                                                        className="premium_input"
                                                        value={formData.premium}
                                                        min="0"
                                                        max="10"
                                                        onChange={(e) => handleChange(e)}
                                                        type="number"/>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ margin: '0px', padding: '0px'}}>
                                                <FaPlus onClick={() => managePayment("premium", "add")} className="order_plus_icon"/>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        {formData.total_premium}
                                    </td>
                                </tr>
                            </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <p className="float-right" style={{ margin: '0px', fontSize: '1rem', fontWeight: 'bold' }}>
                                Total : {total} CHF
                            </p>        
                        </Col>
                    </Row>
                    <Row className="shadow-lg" style={{ margin: '10px 0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button className="float-left" onClick={() => redirectPage('/home')} size="sm" variant="primary">
                                Back
                            </Button>        
                        </Col>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button onClick={() => redirectPage('/home/payment')} className="float-right" size="sm" variant="success">
                                Continue
                            </Button>   
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Form>
        </Container>
    );
}

export default withRouter(Order);
