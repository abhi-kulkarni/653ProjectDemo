import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import '../static/css/custom.css'
import '../index.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import {
    FaShoppingCart,
    FaFileAlt,
    FaKey,
    FaUserCircle,
    FaSignOutAlt,
    FaAt,
    FaUser,
    FaEnvelope,
    FaUserShield,
    FaComments
  } from "react-icons/fa";

const Home = (props) => {

    const history = useHistory();

    const redirectPage = (page) => {
        history.push(page);
    }


    return (
        <Container style={{ paddingBottom: '60px' }}>
            <Row style={{ padding: '0px', margin: '10px 0px 0px 0px' }}>
                <Col className="breadcrumb_container" style={{ padding: '20px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Breadcrumb style={{ margin: '0px', padding: '10px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                    <Breadcrumb.Item onClick={() => redirectPage('/shop')}>Storlytics Online Shop</Breadcrumb.Item>
                    <Breadcrumb.Item active>Account</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px' }}>
                <Col style={{ padding: '0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Alert style={{ textAlign: 'center', padding: '10px', fontSize: '0.9rem' }} key="alert" variant="secondary">
                        Welcome to your Account
                    </Alert>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaShoppingCart className="home_section_icon"/> Shop
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Text>
                                    <Button onClick={() => redirectPage('/home/order')} size="sm" variant="outline-success">
                                        Purchase Storlytics Software <FaShoppingCart className="home_shopping_section_cart_icon"/> 
                                    </Button>
                                </Card.Text>
                                <Button onClick={() => redirectPage('/home/quote')} size="sm" variant="outline-primary">
                                    Request a quote <FaFileAlt className="home_shopping_section_quote_icon"/> 
                                </Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="shadow-lg" style={{ margin: '20px 0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaUser className="home_section_icon"/> Account Summary
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Row style={{ padding: '0px', margin: '0px' }}>
                                <Col onClick={() => redirectPage('/home/modify_profile/1')} style={{ textAlign: 'center', padding: '10px 5px 5px 5px', margin: '0px', cursor: 'pointer' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FaUserCircle className="modify_profile_icon"/> <a className="modify_profile">Modify Profile</a>
                                </Col>
                            </Row>
                            <Row style={{ padding: '0px', margin: '0px' }}>
                                <Col onClick={() => redirectPage('/home/change_password')} style={{ textAlign: 'center', padding: '5px 5px', margin: '0px', cursor: 'pointer' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FaUserShield className="change_password_icon"/>  <a className="change_password">Change your Password</a>
                                </Col>
                            </Row>
                            <Row style={{ padding: '0px', margin: '0px' }}>
                                <Col onClick={() => redirectPage('/shop/login')} style={{ textAlign: 'center', padding: '5px 5px 10px 5px', margin: '0px', cursor: 'pointer' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <FaSignOutAlt className="logout_icon"/>  <a className="logout">Logout</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaKey className="home_section_icon"/> Licenses
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card style={{ border: 'none' }}>
                                <Card.Body>
                                    <Card.Text>
                                        <span className="license_summary_text">If your company / organization already owns a customer ID, please provide it to us in order to link it to your account.</span>
                                    </Card.Text>
                                    <Button onClick={() => redirectPage('/home/customer-data')} size="sm" variant="outline-secondary">
                                        Provide your customer ID <FaComments className="home_shopping_section_quote_icon"/> 
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="shadow-lg" style={{ margin: '20px 0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaFileAlt className="home_section_icon"/> Invoices
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Text className="invoice_summary_text">
                                    <span>You have no pending Invoices.</span>
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
    }

export default withRouter(Home);
