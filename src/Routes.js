import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import About from "./About/About";
import Contact from "./Contact/Contact";
import Products from "./Product/Products";
import Home from "./Home/Home";
import Blog from "./Pages/Blog";
import Feature from "./Pages/Features";
import MainLogin from "./Pages/MainLogin";
import Logout from "./Pages/Logout";


// protected Routes
import MyProject from "./Pages/Myproject";
import UploadData from "./Pages/UploadData";
import UploadDataset from "./Pages/UploadDataset";





import history from './history';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
    <Route
    {...rest}
    render={props =>
    sessionStorage.getItem("token") ? (
        <Component {...props} />
    ) : (
        <Redirect
        to = {{
            pathname:"/Login",
            state:{
                from: props.location
            }
        }}
        />
    )
    }
    />
);

export default class Routes extends Component {
    
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/About" component={About} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} />
                    <Route path="/Feature" component={Feature} />
                    <Route path="/Blog" component={Blog} />
                    <Route path="/Login" component={MainLogin} />
                    <Route path="/Logout" component={Logout} />
                    {/* <Route exact path="/Login">{Loggedin ? <Redirect to="/Dashboard" /> : <Redirect to="/"/>}</Route> */}
                    {/* <Route path="/Dashboard" component={Dashboard} /> */}
                    <PrivateRoute path="/MyProject" component={MyProject} />
                    {/* <PrivateRoute path="/data" component={UploadData} /> */}
                    <PrivateRoute path="/dataset" component={UploadDataset} />

                </Switch>
            </Router>
        )
    }
}
