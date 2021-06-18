import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


const Navigation = (props) => {
    // console.log("yhi hai",props);
  const isLoggedin = sessionStorage.getItem("token")

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Analytics Workbench</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Feature">Features</Nav.Link>
                    <Nav.Link href="/About">About</Nav.Link>
                    <Nav.Link href="/Blog">Blog</Nav.Link>
                    <Nav.Link href="/Contact">Contact</Nav.Link>
                    <Nav.Link href="/Products">Products</Nav.Link>
                    {
                    isLoggedin ?
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    :
                    <Nav.Link href="/Login">Get Started</Nav.Link>
                    }
                 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);