import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import '../static/css/custom.css'

const Download = (props) => {
    
  const history = useHistory();

  const redirectPage = (page) => {
      history.push(page);
  }

  return (
    <Row style={{ padding: '0px', margin: '0px' }}>
      <Col style={{ padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={{ height: '300px' }}>
        <div className="bgimg-1">
        </div>
        </div>
        
        <div className="download_section_0" style={{ paddingBottom: '0px'}}>
          <h3 style={{ textAlign: 'center', textTransform: 'capitalize', color: 'gray' }}>Pricing</h3>
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
          <Row style={{ fontSize: '0.85rem', padding: '10px 0px 20px 0px', margin: '0px' }}>
            <Col style={{ textAlign: 'center', color: 'gray', padding: '0px 0px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button onClick={() => redirectPage('/shop/login')} size="md" variant="success">REQUEST A QUOTE</Button>
            </Col>
            </Row>
        </div>

        <div className="bgimg-2">
        </div>

        <div className="download_section_0">
        <h3 style={{ textAlign: 'center', textTransform: 'capitalize', color: 'gray' }}>Discounts for non-profit use</h3>
          <Row style={{ padding: '15px 0px', margin: '0px' }}>
            <Col style={{ color: 'gray', fontSize: '0.85rem', padding: '0px', margin: '0px' }} xs={0} sm={0} md={0} lg={1} xl={1}></Col>
            <Col style={{ color: 'gray', padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={10} xl={10}>
              <Table style={{ color: 'gray', fontSize: '0.85rem' }} responsive striped bordered>
              <tbody>
                <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <td>Education</td>
                  <td>Classroom</td>
                  <td>Student</td>
                  <td>Training</td>
                  <td>Research</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}> <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>-40%</span> <br/> on Professional fees</td>
                  <td style={{ textAlign: 'center' }}> <span style={{ fontSize: '1rem' }}>CHF</span><span style={{ marginLeft: '5px', fontWeight: 'bold', fontSize: '1.4rem' }}>-40%</span> <br/> on Professional fees</td>
                  <td style={{ textAlign: 'center' }}> <span style={{ fontSize: '1rem' }}>CHF</span> <span style={{ marginLeft: '5px', fontWeight: 'bold', fontSize: '1.4rem' }}>-40%</span> <br/> on Professional fees</td>
                  <td style={{ textAlign: 'center' }}> <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>-20%</span> <br/> on Professional fees</td>
                  <td style={{ textAlign: 'center' }}> <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>-20%</span> <br/> on Professional fees</td>
                </tr>
                <tr>
                  <td>Print reports watermark : “Education”</td>
                  <td>Manufacturers mentioned as generic in the report</td>
                  <td>Manufacturers mentioned as generic in the report</td>
                  <td>Print reports watermark : “Training”</td>
                  <td>Print reports watermark: “Research”</td>
                </tr>
                <tr>
                  <td>Granted upon supply of an Educational program</td>
                  <td>Print reports watermark : “Classroom”</td>
                  <td>Print reports watermark : “Student”</td>
                  <td>Granted upon supply of a Training program</td>
                  <td>Granted upon supply of a Research program</td>
                </tr>
                <tr>
                  <td>Only for teacher devices</td>
                  <td>Granted upon supply of an Educational program</td>
                  <td>Granted upon supply of a copy of a Student card</td>
                  <td>Only for private institutes</td>
                  <td>Granted upon supply of a Research program</td>
                </tr>
              </tbody>
              </Table>
            </Col>
          </Row>
        </div>

        <div className="bgimg-3">
        </div>
        
        <div className="download_section_0">
          <Row style={{ margin: '0px', padding: '0px' }}>
            <Col style={{ textAlign: 'center', margin: '0px', padding: '0px 0px 20px 0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
              <h6 style={{ fontWeight: 'light', color: '#0879FA', padding: '20px' }}>Login/Create your own account to place an order, to pay an invoice, to get a quote, to have an overview of your licenses.</h6>
              <Button onClick={() => redirectPage('/shop/login')} size="md" variant="outline-primary">Login/Register</Button>
            </Col>
          </Row>
        </div>

      </Col>
    </Row>
  );
}

export default withRouter(Download);
