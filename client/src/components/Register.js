import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      secQues: "",
      secAns: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeSecAns = this.onChangeSecAns.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeSelect(e) {
    this.setState({
      secQues: e.target.value,
    });
  }
  onChangeSecAns(e) {
    this.setState({
      secAns: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      secQues: this.state.secQues,
      secAns: this.state.secAns,
    };
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.email.match(mailformat)) {
      register(newUser).then((res) => {
        this.props.history.push(`/login`);
      });
    } else {
      alert("You have entered an invalid email address!");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Security Question</label>
                <br></br>
                <select
                  className="custom-select custom-select-m"
                  onChange={this.onChangeSelect}
                  required
                >
                  <option>Select Role</option>
                  <option>What primary school did you attend?</option>
                  <option>
                    What is the name of your favorite childhood friend?
                  </option>
                  <option>What is the name of your hometown?</option>
                  <option>What is your favorite movie?</option>
                  <option>In what city were you born?</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="password">Security Answer</label>
                <input
                  type="password"
                  className="form-control"
                  name="secAns"
                  placeholder="Security Answer"
                  value={this.state.secAns}
                  onChange={this.onChangeSecAns}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
