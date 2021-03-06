import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import "./Home.css";
import Header from "../components/Header"

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <Header/>
          <h1>Home page</h1>
          <p>A simple app showing react button click navigation</p>
          <form>
            <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button>
          </form>
          <br/>
          <form>
            <Button variant="btn btn-success" onClick={() => history.push('/Login')}>Let's Start</Button>
          </form>
        </div>
      </div>
    );
  }
}
