import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from 'react-bootstrap/Form'
import {
    FaUserShield,
    FaEye,
    FaEyeSlash,
    FaExclamationTriangle
} from "react-icons/fa";
import '../index.css'
import { API_URL } from "../constants";
import axios from "axios";

const ManageShop = (props) => {

    const history = useHistory();
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        password: "",
        current_password:"",
        confirm_password:""
    });
    const [formData, setFormData] = useState({
        password: "",
        current_password:"",
        confirm_password:""
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordRegex = RegExp(
        /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,10}$/
    );

    const redirectPage = (page) => {
        history.push(page);
    }

    const passwordVisibilityToggle = (type) => {
        if (type === "password") {
          let password = !showPassword;
          setShowPassword(password);
        } else if(type === "current_password"){
            let current_password = !showCurrentPassword;
            setShowCurrentPassword(current_password);
        }else {
            let confirm_password = !showConfirmPassword;
            setShowConfirmPassword(confirm_password);
        }
    };

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
        let password = formData.password;
        validate(name, value, password);
      };
    
      const validate = (name, value, password) => {
        switch (name) {
            case "current_password":
                setFormData({ ...formData, current_password: value });
                break;
            case "password":
                setFormData({ ...formData, password: value });
                if (passwordRegex.test(value)) {
                  setFormErrors({ ...formErrors, password: "" });
                } else {
                  if (value.length > 0) {
                    setFormErrors({
                      ...formErrors,
                      password: "Password is invalid",
                    });
                  } else {
                    setFormErrors({ ...formErrors, password: "" });
                  }
                }
                break;
              case "confirm_password":
                setFormData({ ...formData, confirm_password: value });
                if (value.length > 0 && value !== password) {
                  setFormErrors({
                    ...formErrors,
                    confirm_password: "Password and Confirm password should be the same",
                  });
                } else {
                  setFormErrors({ ...formErrors, confirm_password: "" });
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
                        <Breadcrumb.Item active>Change Password</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ margin: '0px',padding: '0px'}} xs={0} sm={0} md={0} lg={3} xl={3}></Col>
                <Col style={{ padding: '10px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '7.5px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaUserShield className="change_password_section_icon"/> Change Password
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
                                                <Form.Group controlId="current_password">
                                                        <Form.Label className="float-left">Current Password <span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                name="current_password"
                                                                type={showCurrentPassword ? "text" : "password"}
                                                                value={formData.current_password}
                                                                onChange={(e) => handleChange(e)}
                                                                placeholder="Enter Current Password"
                                                                required
                                                            ></Form.Control>
                                                        <InputGroup.Append>
                                                            <InputGroup.Text
                                                            className="cursor_pointer"
                                                            onClick={() => passwordVisibilityToggle("current_password")}
                                                            >
                                                            {showCurrentPassword ? (
                                                                <FaEye style={{ color: "#007BFF" }} />
                                                            ) : (
                                                                <FaEyeSlash style={{ color: "#007BFF" }} />
                                                            )}
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        </InputGroup>
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                        <Col style={{ padding: "0px" }}>
                                                            {formErrors.current_password && formErrors.current_password.length > 0 && (
                                                            <span className="float-left error_message">
                                                                {formErrors.current_password}
                                                            </span>
                                                            )}
                                                        </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group controlId="password">
                                                        <Form.Label className="float-left">New Password <span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                name="password"
                                                                type={showPassword ? "text" : "password"}
                                                                value={formData.password}
                                                                onChange={(e) => handleChange(e)}
                                                                placeholder="Enter Password"
                                                                required
                                                            ></Form.Control>
                                                        <InputGroup.Append>
                                                            <InputGroup.Text
                                                            className="cursor_pointer"
                                                            onClick={() => passwordVisibilityToggle("password")}
                                                            >
                                                            {showPassword ? (
                                                                <FaEye style={{ color: "#007BFF" }} />
                                                            ) : (
                                                                <FaEyeSlash style={{ color: "#007BFF" }} />
                                                            )}
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        </InputGroup>
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                        <Col style={{ padding: "0px" }}>
                                                            {formErrors.password && formErrors.password.length > 0 && (
                                                            <span className="float-left error_message">
                                                                {formErrors.password}
                                                                <OverlayTrigger
                                                                key="top"
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip>
                                                                    <span>
                                                                        password must contain minimum 6 and maximum 10
                                                                        characters, at least one uppercase letter, one
                                                                        lowercase letter, one number and one special
                                                                        character
                                                                    </span>
                                                                    </Tooltip>
                                                                }
                                                                >
                                                                <FaExclamationTriangle
                                                                    style={{
                                                                    margin: "0px 0px 4px 10px",
                                                                    cursor: "pointer",
                                                                    }}
                                                                />
                                                                </OverlayTrigger>
                                                            </span>
                                                            )}
                                                        </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group controlId="confirm_password">
                                                        <Form.Label className="float-left">Confirm Password <span style={{ color: 'red'}}>*</span></Form.Label>
                                                        <InputGroup>
                                                        <Form.Control
                                                            autoComplete="off"
                                                            name="confirm_password"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={formData.confirm_password}
                                                            onChange={(e) => handleChange(e)}
                                                            placeholder="Confirm Password"
                                                            required
                                                        ></Form.Control>
                                                        <InputGroup.Append>
                                                            <InputGroup.Text
                                                            className="cursor_pointer"
                                                            onClick={() => passwordVisibilityToggle("confirm_password")}
                                                            >
                                                            {showConfirmPassword ? (
                                                                <FaEye style={{ color: "#007BFF" }} />
                                                            ) : (
                                                                <FaEyeSlash style={{ color: "#007BFF" }} />
                                                            )}
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        </InputGroup>
                                                        <Row style={{ padding: "0px", margin: "0px" }}>
                                                        <Col style={{ padding: "0px" }}>
                                                            {formErrors.confirm_password && formErrors.confirm_password.length > 0 &&
                                                            formErrors.password.length <= 0 && (
                                                                <span className="float-left error_message">
                                                                {formErrors.confirm_password}
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
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ margin: '0px',padding: '0px'}} xs={0} sm={0} md={0} lg={3} xl={3}></Col>
                <Col style={{ padding: '0px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button className="float-left" onClick={() => redirectPage('/home')} size="sm" variant="primary">
                                Back
                            </Button>        
                        </Col>
                        <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button type="submit" className="float-right" size="sm" variant="success">
                                    Change Password
                            </Button>   
                        </Col>
                    </Row>
                </Col>
            </Row>
            {!signUpSuccessMsg ? (
            ""
            ) : (
            <Row style={{ margin: "0px 0px 10px 0px", padding: "0px" }}>
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
            </Form>
        </Container>
    );
}

export default withRouter(ManageShop);
