import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import $ from 'jquery'

const Header = (props) => {

    const history = useHistory();

    useEffect(() => {
        $('a').on('click', function() {
            $('a').css("color", "black");
            $('a').not(this).removeClass('underline');
            $(this).toggleClass('underline');
        })
    }, [])

    useEffect(() => {
        let link_dict = {
            '/shop/login': 'Login',
            '/': 'Home',
            '/download': 'Download', 
            '/shop': 'Shop',
            '/admin': 'Admin Dashboard'
        }
        let links = Array.from(document.getElementsByClassName('nav_links'));
        links.map(item => {
            if(link_dict[history.location.pathname] === item.innerHTML){
                item.style.color = 'black';
                item.classList.add("underline");
            }else{
                item.classList.remove("underline");
            }
        })
    }, [history.location])

    const redirectPage = (page) => {
        history.push(page);
    }

    return (
        <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => redirectPage('/')}>
                <p className="brand_name" >Adversarial Attacks</p>
                <p className="brand_tag_line" style={{ fontStyle: 'italic' }}>
                    Authors: <span style={{ color: '#0879FA' }}>Abhishek Kulkarni, Shreeya Joshi</span></p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="nav_link_container ml-auto">
                    <Nav.Link className="nav_links" onClick={() => redirectPage('/')}>Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
}

export default withRouter(Header);
