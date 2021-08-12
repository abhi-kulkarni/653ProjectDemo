import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import SignIn from './SignIn'

const AdminLogin = (props) => {

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
                        <Breadcrumb.Item active>Admin Login</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={0} sm={0} md={3} lg={3} xl={3}></Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <SignIn admin={true}/>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(AdminLogin);
