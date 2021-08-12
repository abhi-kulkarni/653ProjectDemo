import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import '../static/css/custom.css'
import '../index.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import DataTable from "react-data-table-component";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
    FaKey, FaSignOutAlt
  } from "react-icons/fa";

const License = (props) => {

    const history = useHistory();
    const [licenses, setLicenses] = useState([
    {
        'license_id': '1',
        'owner': 'John',
        'license_number': 'AAAAA-BBBB-CCCC-DDDDD',
        'created_on': 'TimeStamp',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    },
    {
        'license_id': '2',
        'owner': 'Mary',
        'license_number': 'AAAA1-BBB1-CCC1-DDDD1',
        'created_on': 'TimeStamp',
        'license_type': 'Full',
        'expires_on': 'TimeStamp',
    },{
        'license_id': '3',
        'owner': 'Jane',
        'license_number': 'AAAA2-BBB2-CCC2-DDDD2',
        'created_on': 'TimeStamp',
        'license_type': 'Premium',
        'expires_on': 'TimeStamp',
    },{
        'license_id': '4',
        'owner': 'Dave',
        'license_number': 'AAAA3-BBB3-CCC3-DDDD3',
        'created_on': 'TimeStamp',
        'license_type': 'Full',
        'expires_on': 'TimeStamp',
    },{
        'license_id': '5',
        'owner': 'Steve',
        'license_number': 'AAAA4-BBB4-CCC4-DDDD4',
        'created_on': 'TimeStamp',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    }]);


    const license_columns = [
        {
            name: "License Id",
            selector: "license_id",
            sortable: true,
            center:true,
            width: '120px'
        },
        {
            name: "Owner",
            selector: "owner",
            sortable: true,
            center:true,
            width: '120px'
            
        },
        {
            name: "License Number",
            selector: "license_number",
            sortable: true,
            left:true,
            width: '200px'
        },
        {
            name: "Created On",
            selector: "created_on",
            sortable: true,
            center:true,
        },
        {
            name: "License Type",
            selector: "license_type",
            sortable: true,
            center:true,
        },
        {
            name: "Expires On",
            selector: "expires_on",
            sortable: true,
            center:true,
        }
    ];


    const ActionComponent = ({  row, onClick  }) => {
        const clickHandler = () => onClick(row);
        return <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip>
            Show Licenses
          </Tooltip>
        }
      ><FaKey className="show_licenses_icon" onClick={clickHandler}/>
      </OverlayTrigger>;
    };

    const TableCheckBox = React.forwardRef(({ onClick, ...rest }, ref) => (
        <div className="custom-control custom-checkbox">
            <input
            type="checkbox"
            className="custom-control-input"
            ref={ref}
            {...rest}
            />
            <label className="custom-control-label" onClick={onClick} />
        </div>
    ));
    
    useEffect(() => {
        let ele = document.getElementsByClassName("rdt_TableHeader")[0];
        if(ele){
            ele.remove();
        }
    }, [])

    const redirectPage = (page) => {
        history.push(page);
    }

    return (
        <Container style={{ paddingBottom: '20px' }}>
            <Row style={{ padding: '0px', margin: '10px 20px 0px 20px' }}>
                <Col style={{ margin: '0px', padding: '0px', textAlign: 'left', fontSize: '0.9rem', backgroundColor: '#E7EAED' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row style={{ padding: '0px', margin: '0px' }}>
                        <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                            <Breadcrumb className="breadcrumb_dashboard">
                                <Breadcrumb.Item onClick={() => redirectPage('/admin/dashboard')}>Storlytics Admin Portal</Breadcrumb.Item>
                                <Breadcrumb.Item active>Licenses</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col className="breadcrumb_container" xs={3} sm={3} md={3} lg={3} xl={3}>
                            <div style={{ paddingTop: '10px' }} className="float-right">
                                <span>Logout</span> <FaSignOutAlt className="admin_logout_icon" onClick={() => redirectPage('/admin')}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '0px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaKey className="admin_licenses_section_icon"/> Licenses
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="admin_licenses_section_text">
                                <span> User </span>
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <DataTable
                                columns={license_columns}
                                data={licenses}
                                defaultSortField="id"
                                pagination
                                paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                                paginationPerPage={5}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
    }

export default withRouter(License);
