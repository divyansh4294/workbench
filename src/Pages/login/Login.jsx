import React from "react";
import loginImg from "./loginimages.svg";
import { login } from "./UserFunctions";
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      password: "",
      error:'',
      id: 0
    }
  }


  componentDidMount() {
    // const token = sessionStorage.getItem("token");

    axios.get("http://localhost:5000/Login")
      .then((res) =>
        this.setState({
          users: res.data,
          username: "",
          password: "",
          id: 0
        })
      )
    // console.log("Login added:", token)
  }

  usernameChange = (e) => {
    this.setState({ username: e.target.value })
  }

  passwordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  onSubmit(e, id) {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ error: false });
    console.log("This is submit click")
    if (id === 0) {
      axios.post("http://localhost:5000/Login",
        {
          "username": this.state.username,
          "password": this.state.password
        }, {
        headers: {
          "Contect-Type": "application/json",
        }
      }).then(resp => {
        if (resp.status === 200) return resp;
        else alert("There has been an error");
      })
        .then((resp) => {
          // console.log("res:", resp.data)
          sessionStorage.setItem('token', resp.data.access_token)
          sessionStorage.setItem('username', resp.data.username)

          if (!!sessionStorage.token) {
            window.location.reload(false)
          }
          else{
            this.setState({ error: true });
          }
        })
        .catch(err => {
          alert("Wrong Username or Password !!!")
        })
    }
  }

  render() {
    const token = sessionStorage.getItem("token");
    // const history = useHistory();
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {(token && token != "" && token != undefined)
          ?
          (<Redirect to='/MyProject'/>)
          :
          (
            <form noValidate onSubmit={(e) => { this.onSubmit(e, this.state.id) }}>
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  <img src={loginImg} alt='' />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={(e) => { this.usernameChange(e) }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => { this.passwordChange(e) }}
                    />
                  </div>

                </div>
              </div>

              <div className="footer">
                <button type="submit" className="btn">
                  Login
          </button>
              </div>

            </form>
          )}
      </div>
    );
  }
}
