import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import '../static/css/custom.css'
import '../index.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import DataTable from "react-data-table-component";
import Badge from 'react-bootstrap/Badge'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
    FaChartPie,
    FaKey,
    FaChartBar,
    FaTable,
    FaSignOutAlt
  } from "react-icons/fa";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    // LineChart,
    BarChart,
    PieChart,
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    // GraphChart,
    // GaugeChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    // CandlestickChart,
    // EffectScatterChart,
    // LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
  } from 'echarts/charts';
  // import components, all suffixed with Component
  import {
    // GridSimpleComponent,
    GridComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    // CalendarComponent,
    // GraphicComponent,
    // ToolboxComponent,
    TooltipComponent,
    // AxisPointerComponent,
    // BrushComponent,
    TitleComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    LegendComponent,
    // LegendScrollComponent,
    // LegendPlainComponent,
    // DataZoomComponent,
    // DataZoomInsideComponent,
    // DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
    // DatasetComponent,
  } from 'echarts/components';
  // Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
  import {
    CanvasRenderer,
    SVGRenderer,
  } from 'echarts/renderers';
  import $ from 'jquery';
// Register the required components
echarts.use(
[TitleComponent, TooltipComponent, GridComponent, BarChart, PieChart, CanvasRenderer, LegendComponent]
);

const Home = (props) => {

    const history = useHistory();
    const [users, setUsers] = useState([{
        'id': '1',
        'first_name': 'ABC1',
        'last_name': 'XYZ1',
        'organization': 'DEF1',
        'type_of_organization': 'Student',
        'created_on': 'Timestamp1',
        'license_id': '1',
        'license_number': 'AAAAA-BBBB-CCCC-DDDDD',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    },{
        'id': '1',
        'first_name': 'ABC1',
        'last_name': 'XYZ1',
        'organization': 'DEF1',
        'type_of_organization': 'Student',
        'created_on': 'Timestamp1',
        'license_id': '2',
        'license_number': 'AAAA1-BBB1-CCC1-DDDD1',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    },{
        'id': '1',
        'first_name': 'ABC1',
        'last_name': 'XYZ1',
        'organization': 'DEF1',
        'type_of_organization': 'Student',
        'created_on': 'Timestamp1',
        'license_id': '3',
        'license_number': 'AAAA2-BBB2-CCC2-DDDD2',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    },{
        'id': '2',
        'first_name': 'ABC2',
        'last_name': 'XYZ2',
        'organization': 'DEF2',
        'type_of_organization': 'Private',
        'created_on': 'Timestamp2',
        'license_id': '4',
        'license_number': 'AAAA3-BBB3-CCC3-DDDD3',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Full',
        'expires_on': 'TimeStamp',
        
    },{
        'id': '3',
        'first_name': 'ABC3',
        'last_name': 'XYZ3',
        'organization': 'DEF3',
        'type_of_organization': 'Company',
        'created_on': 'Timestamp3',
        'license_id': '5',
        'license_number': 'AAAA4-BBB4-CCC4-DDDD4',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Trial',
        'expires_on': 'TimeStamp',
    },{
        'id': '3',
        'first_name': 'ABC3',
        'last_name': 'XYZ3',
        'organization': 'DEF3',
        'type_of_organization': 'Company',
        'created_on': 'Timestamp3',
        'license_id': '6',
        'license_number': 'AAAA5-BBB5-CCC5-DDDD5',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Premium',
        'expires_on': 'TimeStamp',
    }, 
    {
        'id': '4',
        'first_name': 'ABC4',
        'last_name': 'XYZ4',
        'organization': 'DEF4',
        'type_of_organization': 'Student',
        'created_on': 'Timestamp4',
        'license_id': '7',
        'license_number': 'AAAA7-BBB7-CCC7-DDDD7',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Premium',
        'expires_on': 'TimeStamp',
    },
    {
        'id': '4',
        'first_name': 'ABC4',
        'last_name': 'XYZ4',
        'organization': 'DEF4',
        'type_of_organization': 'Student',
        'created_on': 'Timestamp4',
        'license_id': '8',
        'license_number': 'AAAA8-BBB8-CCC8-DDDD8',
        'license_created_on': 'TimeStamp',
        'type_of_discount': 'None',
        'license_type': 'Premium',
        'expires_on': 'TimeStamp',
    }]);


    const user_columns = [
        {
            name: "Id",
            selector: "id",
            sortable: true,
            center:true,
        },
        {
            name: "First Name",
            selector: "first_name",
            sortable: true,
            center:true,
        },
        {
            name: "Last Name",
            selector: "last_name",
            sortable: true,
            center:true,
        },
        {
            name: "Organization",
            selector: "organization",
            sortable: true,
            center:true,
        },
        {
            name: "Organization Type",
            selector: "type_of_organization",
            sortable: true,
            center:true,
        },
        {
            name: "Created on",
            selector: "created_on",
            sortable: true,
            center:true,
        },
        {
            name: "License Id",
            selector: "license_id",
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
            name: "License Created On",
            selector: "license_created_on",
            sortable: true,
            center:true,
        },
        {
            name: "Type of Discount",
            selector: "type_of_discount",
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
        // {
        //     name: "Licenses",
        //     selector: "licenses",
        //     sortable: true,
        //     center:true,
        //     cell: (row) => <Badge style={{ fontSize: '10px' }} variant="primary">{row.licenses}</Badge>
        // },
        // {
        //     name: "View Licenses",
        //     selector: "action",
        //     sortable: true,
        //     center:true,
        //     cell: (row) => <ActionComponent row={row} onClick={handleRowClick}/>
        // }
    ];


    const ActionComponent = ({  row, onClick  }) => {
        const clickHandler = () => onClick(row);
        return <OverlayTrigger
        key="top"
        placement="top"
        overlay={
          <Tooltip>
            View Licenses
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

    const handleRowClick = (data) => { 
        history.push('/admin/users/'+data.id);
    }

    const redirectPage = (page) => {
        history.push(page);
    }


    const getUserOptions = () => {
        let option = {
            color: '#0879FA',
            grid: {
                left: 40,
                top: 35,
                right: 60,
                bottom: 45
            },
            legend: {
                show: true
            },
            xAxis: {
                name: 'Months',
                nameTextStyle: {
                    fontWeight: 'bold',
                    color: '#0879FA'
                },
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                },
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                name: 'Users',
                nameTextStyle: {
                    fontWeight: 'bold',
                    color: '#0879FA'
                },
                type: 'value'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130, 150, 30, 20, 50, 100],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                type: 'bar',
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        };
        return option;
    }

    const getTypeOfLicensePieOption = () => {

        let option = {
            color: ['#0879FA', '#F4B400', '#0F9D58'],
            grid: {
                left: 0,
                top: 20,
                right: 0,
                bottom: 20
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                top: '0',
            },
            series: [
                {
                    name: 'Type of License',
                    type: 'pie',
                    radius: '60%',
                    data: [
                        {value: 1048, name: 'Trial'},
                        {value: 735, name: 'Full'},
                        {value: 580, name: 'Premium'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        return option;
    }


    return (
        <Container style={{ paddingBottom: '60px' }}>
            <Row style={{ padding: '0px', margin: '0px 20px 0px 20px' }}>
                <Col style={{ margin: '0px', padding: '0px', textAlign: 'left', fontSize: '0.9rem', backgroundColor: '#E7EAED' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row style={{ padding: '0px', margin: '0px' }}>
                        <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                            <Breadcrumb className="breadcrumb_dashboard">
                                <Breadcrumb.Item onClick={() => redirectPage('/admin/dashboard')}>Storlytics Admin Portal</Breadcrumb.Item>
                                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
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
            <Row style={{ padding: '10px 0px', margin: '0px' }}>
                <Col style={{ padding: '10px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaChartPie className="admin_section_icon"/> Type of Licenses
                            </div>
                        </Col>
                        <Col style={{ padding: '10px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <ReactEChartsCore
                                echarts={echarts}
                                style={{ height: '300px', width: '100%' }}
                                option={getTypeOfLicensePieOption()}
                                notMerge={true}
                                lazyUpdate={true}
                                opts={{renderer: 'svg'}}
                                />
                        </Col>
                    </Row>
                </Col>
                <Col style={{ padding: '10px 20px 0px 20px', margin: '0px' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaChartBar className="admin_section_icon"/> Monthwise Active Users
                            </div>
                        </Col>
                        <Col style={{ padding: '10px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <ReactEChartsCore
                                echarts={echarts}
                                style={{ height: '300px', width: '100%' }}
                                option={getUserOptions()}
                                notMerge={true}
                                lazyUpdate={true}
                                opts={{renderer: 'svg'}}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ padding: '0px', margin: '0px 0px 0px 0px' }}>
                <Col style={{ padding: '0px 20px 20px 20px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className="shadow-lg" style={{ margin: '0px', padding: '0px', border: '1px solid lightgray' }}>
                        <Col style={{ margin: '0px', padding: '10px', backgroundColor: '#F7F7F7',  borderBottom: '1px solid lightgray' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="float-left">
                                <FaTable className="admin_section_icon"/> Users
                            </div>
                        </Col>
                        <Col style={{ margin: '0px', padding: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <DataTable
                                columns={user_columns}
                                data={users}
                                sortFunction={(rows, field, direction) => {return rows}}
                                pagination
                                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                paginationPerPage={10}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
    }

export default withRouter(Home);
