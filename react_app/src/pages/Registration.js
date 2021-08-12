import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import { Orientation } from "../components/Orientation";
import { Multiselect } from 'multiselect-react-dropdown';
import carousel_5 from '../static/images/carousel_5.jpg'
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaUser,
  FaWallet,
  FaAddressCard,
  FaFileAlt,
  FaLaptop,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import { API_URL } from "../constants";
import axios from "axios";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { user_created_success } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import CSRFToken from "../components/csrf";
import "../index.css";
import {isMobile, isMobileOnly} from 'react-device-detect';

const Registration = (props) => {

  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [captchaModalShow, setCaptchModalShow] = React.useState(false);
  const history = useHistory();
  const [orientation, setOrientation] = useState("default");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpSuccessMsg, setSignUpSuccessMsg] = useState("");
  const [genderOptions, setGenderOptions] = useState([{'name': 'Male', 'id': 'male'},{'name': 'Female', 'id': 'female'}, {'name': 'Other', 'id': 'other'}]);
  const [companyOptions, setCompanyOptions] = useState([{'name': 'Private', 'id': 'private'},{'name': 'Student', 'id': 'student'}, {'name': 'Company', 'id': 'company'},{'name': 'Research Institute', 'id': 'research_institute'}, {'name': 'Education Institute', 'id': 'education_institute'}]);
  const [countryOptions, setCountryOptions] = useState([{'name': 'India', 'id': 'India'}, {'name': 'England', 'id': 'England'}, {'name': 'Australia', 'id': 'Australia'}]);
  const [billingCountryOptions, setBillingCountryOptions] = useState([{'name': 'India', 'id': 'India'}, {'name': 'England', 'id': 'England'}, {'name': 'Australia', 'id': 'Australia'}]);
  const [preSelectedBillingCountry, setPreSelectedBillingCountry] = useState([])
  const genderDropDownRef = useRef(null);
  const companyDropDownRef = useRef(null);
  const countryDropDownRef = useRef(null);
  const [errorList, setErrorList] = useState([]);
  const billingCountryDropDownRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    'first_name': '',
    'last_name': '',
    'gender':'',
    'company':'',
    'type_of_company':'',
    'address':'',
    'address_2':'',
    'city':'',
    'zip':'',
    'country':'',
    'phone':'',
    'fax':'',
    'contact_person':'',
    'billing_address':'',
    'billing_address_2':'',
    'billing_city':'',
    'billing_zip':'',
    'billing_country':'',
    'billing_phone':'',
    'billing_fax':'',
    'email':'',
    'confirm_email':'',
    'password':'',
    'confirm_password':''
  });
  const [formErrors, setFormErrors] = useState({
    'first_name': '',
    'last_name': '',
    'gender':'',
    'company':'',
    'type_of_company':'',
    'address':'',
    'address_2':'',
    'city':'',
    'zip':'',
    'country':'',
    'phone':'',
    'fax':'',
    'contact_person':'',
    'billing_address':'',
    'billing_address_2':'',
    'billing_city':'',
    'billing_zip':'',
    'billing_country':'',
    'billing_phone':'',
    'billing_fax':'',
    'email':'',
    'confirm_email':'',
    'password':'',
    'confirm_password':''
  });
  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const [showBillingAddressDiv, setShowBIllingAddressDiv] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [paramsUserId, setParamsUserId] = useState("");
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const passwordRegex = RegExp(
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,}$/
  );

  let { user_id } = useParams();
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    if(history.location.pathname.includes('modify_profile')){
      setEditMode(true);
      setModifiedUserData();
    }
  }, [])


  const setModifiedUserData = () => {
    setParamsUserId(user_id);
  }

  const handleClickOutside = (e) => {
    let elements = [...document.getElementsByClassName("optionListContainer")];
      let curr_gender_ele = null;
      let curr_country_ele = null;
      let curr_company_ele = null;
      let curr_billing_country_ele = null;
      elements.map(item => {
        if(item.parentElement.id === "gender"){
          curr_gender_ele = item;
        }
        if(item.parentElement.id === "country"){
          curr_country_ele = item;
        }
        if(item.parentElement.id === "billing_country"){
          curr_billing_country_ele = item;
        }
        if(item.parentElement.id === "type_of_company"){
          curr_company_ele = item;
        }
      });

      if (
        genderDropDownRef &&
        e.target &&
        genderDropDownRef.current && !genderDropDownRef.current.contains(e.target)
      ) {
        if(curr_gender_ele){
          curr_gender_ele.style.display = 'none';
        }
      }else{
        if(curr_gender_ele){
          curr_gender_ele.style.display = 'block';
        }
      }

      if (
        companyDropDownRef &&
        e.target &&
        companyDropDownRef.current && !companyDropDownRef.current.contains(e.target)
      ) {
        if(curr_company_ele){
          curr_company_ele.style.display = 'none';
        }
      }else{
        if(curr_company_ele){
          curr_company_ele.style.display = 'block';
        }
      }
      if (
        countryDropDownRef &&
        e.target &&
        countryDropDownRef.current && !countryDropDownRef.current.contains(e.target)
      ) {
        if(curr_country_ele){
          curr_country_ele.style.display = 'none';
        }
      }else{
        if(curr_country_ele){
          curr_country_ele.style.display = 'block';
        }
      }

      if (
        billingCountryDropDownRef &&
        e.target &&
        billingCountryDropDownRef.current && !billingCountryDropDownRef.current.contains(e.target)
      ) {
        if(curr_billing_country_ele){
          curr_billing_country_ele.style.display = 'none';
        }
      }else{
        if(curr_billing_country_ele){
          curr_billing_country_ele.style.display = 'block';
        }
      }
  };

  const cloneContactInformation = () => {
    let temp = {...formData};
    if(showBillingAddress){
      temp['billing_address'] = temp['address'];
      temp['billing_address_2'] = temp['address_2'];
      temp['billing_city'] = temp['city'];
      temp['billing_zip_code'] = temp['zip_code'];
      temp['billing_country'] = temp['country'];
      temp['billing_phone'] = temp['phone'];
      temp['billing_fax'] = temp['fax'];
      let preselected_billing_country = [];
      if(temp['country']){
        preselected_billing_country = [{'name': temp['country'], 'id': temp['country']}];
      }
      setPreSelectedBillingCountry(preselected_billing_country);
    }else{
      temp['billing_address'] = '';
      temp['billing_address_2'] = '';
      temp['billing_city'] = '';
      temp['billing_zip_code'] = '';
      temp['billing_country'] = '';
      temp['billing_phone'] = '';
      temp['billing_fax'] = '';
      setPreSelectedBillingCountry([]);
    }
    setFormData(temp);
    setShowBillingAddress(!showBillingAddress);
  }

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

  function onCaptchaChange(value) {
    console.log("Captcha value:", value);
  }

  const handleSubmit = (e, type, data) => {
    let post_data = {};
    let valid = false;
    if (type === "sso") {
      post_data = data;
      valid = true;
    } else {
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
    }
    if (valid) {
      if(isMobileOnly){
        setCaptchModalShow(true)
      }
      if (post_data.hasOwnProperty("confirm_password")) {
        delete post_data["confirm_password"];
      }
      axios
        .post(API_URL + "signup/", post_data)
        .then((response) => {
          if (response.data.ok) {
            dispatch(user_created_success());
            history.push("/");
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

  const passwordVisibilityToggle = (type) => {
    if (type === "password") {
      let password = !showPassword;
      setShowPassword(password);
    } else {
      let confirm_password = !showConfirmPassword;
      setShowConfirmPassword(confirm_password);
    }
  };

  const handleChange = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    let password = formData.password;
    let email = formData.email;
    validate(name, value, email, password);

  };

  const validate = (name, value, email, password) => {
    switch (name) {
      case "first_name":
        setFormData({ ...formData, first_name: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            first_name: "First name is required",
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
            last_name: "Last name is required",
          });
        } else {
          setFormErrors({ ...formErrors, last_name: "" });
        }
      break;
      case "gender":
          setFormData({ ...formData, gender: value });
          if (value.length <= 0) {
            setFormErrors({
              ...formErrors,
              gender: "Select a gender",
            });
          } else {
            setFormErrors({ ...formErrors, gender: "" });
          }
      break;
      case "company_name":
        setFormData({ ...formData, company_name: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            company: "Company/Organization name is required.",
          });
        } else {
          setFormErrors({ ...formErrors, company_name: "" });
        }
      break;  
      case "type_of_company":
        setFormData({ ...formData, type_of_company: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            company: "Select a type of company/organization",
          });
        } else {
          setFormErrors({ ...formErrors, company: "" });
        }
      break;  
      case "address":
        setFormData({ ...formData, address: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            address: "Address is required",
          });
        } else {
          setFormErrors({ ...formErrors, address: "" });
        }
        break;
      case "address_2":
        setFormData({ ...formData, address_2: value });
        break;
      case "city":
        setFormData({ ...formData, city: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            city: "City is required",
          });
        } else {
          setFormErrors({ ...formErrors, city: "" });
        }
        break;
      case "zip_code":
        setFormData({ ...formData, zip_code: value });
        break;
      case "country":
        setFormData({ ...formData, country: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            country: "Select a country",
          });
        } else {
          setFormErrors({ ...formErrors, country: "" });
        }
        break;
      case "phone":
        setFormData({ ...formData, phone: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            phone: "Phone is required",
          });
        } else {
          setFormErrors({ ...formErrors, phone: "" });
        }
      break;
      case "fax":
        setFormData({ ...formData, fax: value });
        break;
      case "contact_person":
        setFormData({ ...formData, contact_person: value });
        break;
      case "billing_address":
        setFormData({ ...formData, billing_address: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            billing_address: "Address is required",
          });
        } else {
          setFormErrors({ ...formErrors, billing_address: "" });
        }
        break;
      case "billing_address_2":
          setFormData({ ...formData, billing_address_2: value });
          break;
      case "billing_city":
        setFormData({ ...formData, billing_city: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            billing_city: "City is required",
          });
        } else {
          setFormErrors({ ...formErrors, billing_city: "" });
        }
        break;
      case "billing_zip":
        setFormData({ ...formData, billing_zip: value });
        break;
      case "billing_country":
        setFormData({ ...formData, billing_country: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            billing_country: "Select a country",
          });
        } else {
          setFormErrors({ ...formErrors, billing_country: "" });
        }
        break;
      case "billing_phone":
        setFormData({ ...formData, billing_phone: value });
        if (value.length <= 0) {
          setFormErrors({
            ...formErrors,
            billing_phone: "Phone is required",
          });
        } else {
          setFormErrors({ ...formErrors, billing_phone: "" });
        }
        break;
      case "billing_fax":
        setFormData({ ...formData, billing_fax: value });
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
        case "confirm_email":
          setFormData({ ...formData, confirm_email: value });
          if (emailRegex.test(value)) {
            if (value.length > 0 && value !== email) {
              setFormErrors({
                ...formErrors,
                confirm_email: "Email and Confirm email should be the same",
              });
            } else {
              setFormErrors({ ...formErrors, confirm_email: "" });
            }
          } else {
            if (value.length > 0) {
              setFormErrors({ ...formErrors, confirm_email: "Invalid email address" });
            } else {
              setFormErrors({ ...formErrors, confirm_email: "" });
            }
          }
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

  const spinner = (display) => {
    display
      ? (document.getElementById("overlay").style.display = "block")
      : (document.getElementById("overlay").style.display = "none");
  };

  const spinnerStop = () => {
    spinner(false);
  };

  const onSelectGender = (selectedList, selectedItem) => {
    validate("gender", selectedList);
    setFormData({...formData, gender: selectedItem.id});
  }
  
  const onRemoveGender = (selectedList, selectedItem) => {
    // setGroupFormData({...formData, group_members: selectedList});
  }

  const onSelectCompany = (selectedList, selectedItem) => {
    validate("type_of_company", selectedList);
    setFormData({...formData, company: selectedItem.id});
  }
  
  const onRemoveCompany = (selectedList, selectedItem) => {
    // setGroupFormData({...formData, group_members: selectedList});
  }

  const onSelectCountry = (selectedList, selectedItem) => {
    validate("country", selectedList);
    setFormData({...formData, country: selectedItem.id});
  }

  const onRemoveCountry = (selectedList, selectedItem) => {
      // setGroupFormData({...formData, country: selectedList});
  }

  const onSelectBillingCountry = (selectedList, selectedItem) => {
    validate("billing_country", selectedList);
    setFormData({...formData, billing_country: selectedItem.id});
  }

  const onRemoveBillingCountry = (selectedList, selectedItem) => {
      // setGroupFormData({...formData, country: selectedList});
  }

  return (
    <Container style={{ paddingBottom: '60px' }}>
      <Form onSubmit={(e) => handleSubmit(e, "signup", "")}>
      <CSRFToken />
      <Row style={{ padding: '0px', margin: '10px 35px' }}>
        <Col className="breadcrumb_container" style={{ padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
              {!editMode?
              <Breadcrumb style={{ margin: '0px', padding: '0px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                <Breadcrumb.Item onClick={() => redirectPage('/')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => redirectPage('/shop')}>Shop</Breadcrumb.Item>
                <Breadcrumb.Item active>Registration</Breadcrumb.Item>
              </Breadcrumb>:
              <Breadcrumb style={{ margin: '0px', padding: '0px', textAlign: 'left', padding: '10px', fontSize: '0.9rem', backgroundColor: '#E7EAED' }}>
                <Breadcrumb.Item onClick={() => redirectPage('/home')}>Account</Breadcrumb.Item>
                <Breadcrumb.Item active>Modify Profile</Breadcrumb.Item>
              </Breadcrumb>
              }
        </Col>
      </Row>
      <Row style={{ margin: '0px', padding: '0px 20px' }}>
          <Col className="personal_info_col" style={{ margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
              <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="float-left">
                    <FaUser className="signup_user_section_icon"/> Personal Information
                  </div>
              </Col>
              <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Group controlId="last_name">
                  <Form.Label className="float-left">First Name <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter First Name"
                    required
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
                <Form.Group controlId="last_name">
                  <Form.Label className="float-left">Last Name <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Last Name"
                    required
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
                <Form.Group controlId="gender" ref={genderDropDownRef}>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className="float-left">Gender <span style={{ color: 'red'}}>*</span></Form.Label>
                    </Col>
                  </Row>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Multiselect
                      id="gender"
                      placeholder="Select Gender"
                      options={genderOptions} 
                      onSelect={onSelectGender}
                      closeOnSelect={true} 
                      onRemove={onRemoveGender}
                      selectedValues={[]}
                      singleSelect={true}
                      style={{
                        chips: { 
                        padding: '0px 5px',
                        fontWeight: 'normal',
                        fontSize: '1rem'
                        },
                        option:{
                          color: 'black'
                        },
                        searchBox:{
                          height: '40px'
                        }
                      }}
                      displayValue="name"
                    />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="company_name">
                  <Form.Label className="float-left">Company/Organization <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="company_name"
                    value={formData.company_name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Company/Organization Name"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.company_name && formErrors.company_name.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.company_name}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="type_of_company" ref={companyDropDownRef}>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className="float-left">Type of company / organization <span style={{ color: 'red'}}>*</span></Form.Label>
                    </Col>
                  </Row>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Multiselect
                      id="type_of_company"
                      placeholder="Select Company/Organization"
                      options={companyOptions} 
                      onSelect={onSelectCompany}
                      selectedValues={[]}
                      closeOnSelect={true} 
                      onRemove={onRemoveCompany}
                      singleSelect={true}
                      style={{
                        chips: { 
                        padding: '0px 5px',
                        fontWeight: 'normal',
                        fontSize: '1rem'
                        },
                        option:{
                          color: 'black'
                        },
                        searchBox:{
                          height: '40px'
                        }
                      }}
                      displayValue="name"
                    />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row className="shadow-lg" style={{ margin: '20px 0px 20px 0px', padding: '0px', border: '1px solid lightgray' }}>
              <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="float-left">
                    <FaAddressCard className="signup_contact_section_icon"/> Contact Information
                  </div>
              </Col>
              <Col className="extra_height_div" style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Group controlId="address">
                  <Form.Label className="float-left">Address <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Address"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.address && formErrors.address.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.address}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="address_2">
                  <Form.Label className="float-left">
                    Address (2) 
                  </Form.Label>
                  <Form.Control
                    name="address_2"
                    value={formData.address_2}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Address 2"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.address_2 && formErrors.address_2.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.address_2}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label className="float-left">City <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter City"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.city && formErrors.city.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.city}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="zip_code">
                  <Form.Label className="float-left">Zip or Postal code</Form.Label>
                  <Form.Control
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Zip Code"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.zip_code && formErrors.zip_code.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.zip_code}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="country" ref={countryDropDownRef}>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className="float-left">Country <span style={{ color: 'red'}}>*</span></Form.Label>
                    </Col>
                  </Row>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Multiselect
                      id="country"
                      placeholder="Select Coutry"
                      options={countryOptions} 
                      onSelect={onSelectCountry}
                      selectedValues={[]}
                      closeOnSelect={true} 
                      onRemove={onRemoveCountry}
                      singleSelect={true}
                      style={{
                        chips: { 
                        padding: '0px 5px',
                        fontWeight: 'normal',
                        fontSize: '1rem'
                        },
                        option:{
                          color: 'black'
                        },
                        searchBox:{
                          height: '40px'
                        }
                      }}
                      displayValue="name"
                    />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label className="float-left">
                    Phone <span style={{ color: 'red'}}>*</span>
                  </Form.Label>
                  <Form.Control
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Phone Number"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.phone && formErrors.phone.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.phone}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="fax">
                  <Form.Label className="float-left">
                    Fax
                  </Form.Label>
                  <Form.Control
                    name="fax"
                    value={formData.fax}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Fax"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.fax && formErrors.fax.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.fax}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col className="captch_container" style={{ padding: '0px', margin: '0px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Row style={{ padding: '0px', margin: '0px' }}>
                  <Col className="captcha_div"  xs={12} sm={12} md={12} lg={12} xl={12}>
                      <ReCAPTCHA
                        sitekey="SVDDSVDVDSVD"
                        onChange={onCaptchaChange}
                      />
                  </Col>
                </Row>
              </Col>
            </Row>      
          </Col>
          <Col className="billing_info_col" style={{ margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
              <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="float-left">
                    <FaWallet className="signup_billing_section_icon"/> Billing Information
                  </div>
              </Col>
              <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Group controlId="contact_person">
                  <Form.Label className="float-left">Contact Person</Form.Label>
                  <Form.Control
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Contact Person Name"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.contact_person && formErrors.contact_person.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.contact_person}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row className="shadow-lg" style={{ margin: '20px 0px 0px 0px', padding: '0px', border: '1px solid lightgray' }}>
              <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Row style={{ margin: '0px', padding: '0px' }}>
                  <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={5} xl={6}>
                    <div className="float-left">
                      <FaFileAlt className="signup_billing_address_section_icon"/> Billing Address
                    </div>
                  </Col>
                  <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={7} xl={6}>
                    <div style={{ margin: '0px 0px 0px 5px', padding: '0px' }} className="float-left">
                      <input style={{ cursor:'pointer', margin: '5px 10px 0px 0px', padding: '0px' }} onClick={() => cloneContactInformation()} type="checkbox" id="billing_address_checkbox"></input>
                      <span style={{ fontSize: '0.85rem' }}>Same as contact information</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              {showBillingAddressDiv?
              <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Group controlId="billing_address">
                  <Form.Label className="float-left">Address <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="billing_address"
                    value={formData.billing_address}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Address"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_address && formErrors.billing_address.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_address}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_address_2">
                  <Form.Label className="float-left">
                    Address (2) 
                  </Form.Label>
                  <Form.Control
                    name="billing_address_2"
                    value={formData.billing_address_2}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Address 2"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_address_2 && formErrors.billing_address_2.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_address_2}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_city">
                  <Form.Label className="float-left">City <span style={{ color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    name="billing_city"
                    value={formData.billing_city}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter City"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_city && formErrors.billing_city.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_city}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_zip_code">
                  <Form.Label className="float-left">Zip or Postal code</Form.Label>
                  <Form.Control
                    name="billing_zip_code"
                    value={formData.billing_zip_code}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Zip Code"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_zip_code && formErrors.billing_zip_code.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_zip_code}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_country" ref={billingCountryDropDownRef}>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className="float-left">Country <span style={{ color: 'red'}}>*</span></Form.Label>
                    </Col>
                  </Row>
                  <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Multiselect
                      id="billing_country"
                      placeholder="Select Coutry"
                      options={billingCountryOptions}
                      selectedValues={preSelectedBillingCountry} 
                      onSelect={onSelectBillingCountry}
                      closeOnSelect={true} 
                      onRemove={onRemoveBillingCountry}
                      singleSelect={true}
                      style={{
                        chips: { 
                        padding: '0px 5px',
                        fontWeight: 'normal',
                        fontSize: '1rem'
                        },
                        option:{
                          color: 'black'
                        },
                        searchBox:{
                          height: '40px'
                        }
                      }}
                      displayValue="name"
                    />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_phone">
                  <Form.Label className="float-left">
                    Phone <span style={{ color: 'red'}}>*</span>
                  </Form.Label>
                  <Form.Control
                    name="billing_phone"
                    value={formData.billing_phone}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Phone Number"
                    required
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_phone && formErrors.billing_phone.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_phone}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="billing_fax">
                  <Form.Label className="float-left">
                    Fax
                  </Form.Label>
                  <Form.Control
                    name="billing_fax"
                    value={formData.billing_fax}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Fax"
                  />
                  <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                      {formErrors.billing_fax && formErrors.billing_fax.length > 0 && (
                        <span className="float-left error_message">
                          {formErrors.billing_fax}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              :""}
            </Row>
            {!editMode?
            <Row className="shadow-lg" style={{ margin: '20px 0px 0px 0px', padding: '0px', border: '1px solid lightgray' }}>
              <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="float-left">
                    <FaLaptop className="signup_login_section_icon"/> Login Information
                  </div>
              </Col>
              <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
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
              <Form.Group controlId="confirm_email">
                <Form.Label className="float-left">Confirm Email address <span style={{ color: 'red'}}>*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="confirm_email_prepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="confirm_email"
                    type="confirm_email"
                    placeholder="Confirm email"
                    value={formData.confirm_email}
                    onChange={(e) => handleChange(e)}
                  ></Form.Control>
                </InputGroup>
                <Row style={{ padding: "0px", margin: "0px" }}>
                  <Col style={{ padding: "0px" }}>
                    {formErrors.confirm_email && formErrors.confirm_email.length > 0 && (
                      <span className="float-left error_message">
                        {formErrors.confirm_email}
                      </span>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="float-left">Password <span style={{ color: 'red'}}>*</span></Form.Label>
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
            :""}
          </Col>
      </Row>
      <Row className="phone_captcha_container" style={{ margin: '0px', padding: '20px 20px' }}>
        <Col className="footer_info_col" style={{ margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
            <Col className="phone_captcha_div" style={{ margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
              <ReCAPTCHA
                  sitekey="Your client site key"
                  onChange={onCaptchaChange}
                />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: '0px', padding: '10px 20px' }}>
        <Col className="footer_info_col" style={{ margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
            <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button className="float-left" onClick={() => editMode?redirectPage('/home'):redirectPage('/shop')} size="md" variant="primary">
                  Back
              </Button>        
            </Col>
            <Col style={{ margin: '0px', padding: '10px', borderBottom: '1px solid lightgray' }} xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button type="submit" className="float-right" size="md" variant="success">
                    {editMode?'Save':'Register'}
              </Button>   
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
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
    <Modal
      show={captchaModalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReCAPTCHA
          sitekey="SVDDSVDVDSVD"
          onChange={onCaptchaChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setCaptchModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

export default withRouter(Registration);
