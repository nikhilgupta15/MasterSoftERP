import React, { Component } from "react";
import axios from "axios";
class SecQues extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      secQues:"",
      secAns:"",
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
  onChangeSecAns(e){
    this.setState({
      secAns: e.target.value,
    })
  }
  onSubmit(e) {
    e.preventDefault();


    axios.post("http://localhost:5000/users/securityQues", {
        email: this.state.email,
         secQues: this.state.secQues,
        secAns: this.state.secAns,
    }).then(res =>{
        if(res.data.msg === "Proceed"){
            localStorage.setItem("email",this.state.email);
            window.location = "/changePassword"
        }
        else{
            alert("Please enter correct details");
        }
    })
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
              
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              
              <div className="form-group">
                <label>Security Question</label>
                <br></br>
                <select
                  className="custom-select custom-select-m"
                  onChange={this.onChangeSelect}
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
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SecQues;
