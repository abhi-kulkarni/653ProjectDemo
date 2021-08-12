import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import SignIn from './SignIn'

const ManageShop = (props) => {

    const history = useHistory();

    const redirectPage = (page) => {
        history.push(page);
    }
    

    return (
        <Container style={{ paddingBottom: '60px' }}>
            <Row style={{ padding: '0px', margin: '10px 0px 0px 0px' }}>
            <Col className="breadcrumb_container" style={{ padding: '20px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Breadcrumb style={{ margin: '0px', padding: '10px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                <Breadcrumb.Item onClick={() => redirectPage('/')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => redirectPage('/shop')}>Shop</Breadcrumb.Item>
                <Breadcrumb.Item active>Login</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px' }}>
                <Col style={{ padding: '0px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Alert style={{ textAlign: 'left', padding: '10px', fontSize: '0.9rem' }} key="alert" variant="info">
                        You need to be registered in order to access the Storlytics online shop.
                    </Alert>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <SignIn/>
                </Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div style={{ fontSize: '1rem' }} className="float-left">Not yet registered ?</div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#0879FA' }}>Register</Card.Title>
                                <Card.Text>
                                   <span style={{ margin: '5px 0px'}}> Create your own account to register for new licenses.</span>
                                   <br/>
                                   <span style={{ margin: '0px' }}>Request a quote.</span>
                                </Card.Text>
                                <Button onClick={() => redirectPage('/register')} size="sm" variant="primary">
                                    Create your account here !
                                </Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(ManageShop);
