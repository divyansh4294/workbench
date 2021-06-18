import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavigationAfterLogin (props) {
    // console.log("yhi hai",props);
  const isLoggedin = sessionStorage.getItem("token")
  const username = sessionStorage.username;
//   const [state, setState] = useState('My Project');

//   const changeTitle = (newTitle) =>{
//       setState(newTitle);
//   }
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Analytics Workbench</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/logout">Logout</Nav.Link>                    
                </Nav>
                <h4 className='username-right' style={{fontSize:"16px", marginTop:"7px", marginLeft:"20px"}}>Hi, {username.charAt(0).toUpperCase()+username.slice(1)}</h4>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default withRouter(NavigationAfterLogin);