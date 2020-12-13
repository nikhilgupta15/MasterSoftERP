import React, { Component } from "react";
import axios from "axios";

class AddReservation extends Component {
  constructor(props) {
    super(props);

    this.changeempID = this.changeempID.bind(this);
    this.onChangeempName = this.onChangeempName.bind(this);
    this.onChangeempSal = this.onChangeempSal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      empID: 0,
      empName: "",
      empSal: 0,
      id: props.location.state.userId,
    };
  }

  changeempID(e) {
    this.setState({
      empID: e.target.value,
    });
  }

  onChangeempName(e) {
    this.setState({
      empName: e.target.value,
    });
  }
  onChangeempSal(e) {
    this.setState({
      empSal: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/users/profile/${this.state.id}/add`, {
        userid: this.state.id,
        empID: this.state.empID,
        empName: this.state.empName,
        empSal: this.state.empSal,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/profile";
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="mt-5">
          <div className="form-group">
            <label>Emp ID: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.empID}
              onChange={this.changeempID}
            />
          </div>
          <div className="form-group">
            <label>Employee Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.empName}
              onChange={this.onChangeempName}
            />
          </div>
          <div>
            <label>Employee Salary </label>
            <input
              type="number"
              className="form-control"
              value={this.state.empSal}
              onChange={this.onChangeempSal}
            ></input>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary mt-3" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddReservation;
