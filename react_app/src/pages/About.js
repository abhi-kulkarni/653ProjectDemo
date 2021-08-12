import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const About = (props) => {
    
  const [user, setUser] = useState("HELLO USER");

  return (
    <Container>
      <Row>
        <Col>{user} about</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

export default withRouter(About);
