import React from "react";
import loginImg from "./loginimages.svg";
import { register } from "./UserFunctions";
import axios from 'axios';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users:[],
      username:"",
      email:"",
      password:"",
      id:0
    }
  }

  componentDidMount(){
    axios.get("http://localhost:5000/Login")
    .then((res)=>
    this.setState({
      users:res.data,
      username:"",
      email:"",
      password:"",
      id:0
    })
    )
    // console.log(" Register added")
  }

  usernameChange=(e)=> {
    this.setState({ username: e.target.value })
  }

  emailChange=(e)=> {
    this.setState({ email: e.target.value })
  }

  passwordChange=(e)=> {
    this.setState({ password: e.target.value })
  }

  onSubmit(e, id) {
    e.preventDefault();
    if (id === 0) {
      // console.log("about Register",id)
      axios.post("http://localhost:5000/Register",
        {
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password
        }, {
        headers: {
          "Contect-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then((res) => {
        // console.log("Register response:",res.data.Message)
        // console.log("Register response:",res.data.Status)

        if (res.data.Status = 'true') {
          // console.log("Status:", res.data.Status)
          // console.log("Message:", res.data.Message)

        }
        if (res.data.Status == "true") {
          // console.log("True Data", res.data)
          alert(res.data.Message);
          this.createFolder(this.state.username)
          this.handleClose()
        }
        else {
          alert(res.data.Message);
        }
      });
    }
  }

  handleClose = () =>{
    this.setState({
      username:"", 
      email:"",
      password:""
    })
  }

  createFolder = (username) => {
    const folderUrl = "http://localhost:5000/createfolder?foldername=" + username;
    fetch(folderUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: {
        'username': this.state.username
      }
    })
      .then(data => {
        console.log("FolderPath", folderUrl)
        console.log("Data", data.body)
      });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form noValidate onSubmit={(e)=>{this.onSubmit(e, this.state.id)}}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt='' />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={(e)=>{this.usernameChange(e)}} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e)=>{this.emailChange(e)}} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e)=>{this.passwordChange(e)}} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
        </form>
      </div>
    );
  }
}