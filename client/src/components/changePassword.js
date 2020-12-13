import React, { Component } from "react";
import axios from "axios";

export default class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      newPassword: "",
      newPassword1: "",
      msg: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const email = localStorage.email;
    this.setState({
      email: email,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.state.newPassword === this.state.newPassword1){
    axios
      .post("http://localhost:5000/users/changePassword", {
        email: this.state.email,
        newPassword: this.state.newPassword,
      })
      .then((res) => {
        this.setState({
          msg: res.data.msg,
        });
        alert(this.state.msg);
        if (this.state.msg === "Password Changed Successfully") {
          window.location = "/login";
        } else {
          this.setState({
            newPassword: "",
            newPassword1: "",
          });
        }
      })
      .catch((err) => console.log(err));
    }
    else{
        alert("Both the passwords do not match, Re-enter correctly");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Change Password
              </h1>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="New Password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Re-enter New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword1"
                  placeholder="Re-enter new password"
                  value={this.state.newPassword1}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
