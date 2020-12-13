import React, { Component } from "react";
import axios from "axios";

export default class EditSurvey extends Component {
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

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.state.id)
      .then((response) => {
        this.setState({
          empID: response.data.empID,
          empName: response.data.empName,
          empSal: response.data.empSal,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

    const resv = {
      empID: this.state.empID,
      empName: this.state.empName,
      empSal: this.state.empSal,
    };

    console.log(resv);

    axios
      .post("http://localhost:5000/users/profile/update/" + this.state.id, resv)
      .then((res) => console.log(res.data));

    window.location = "/profile";
  }

  render() {
    return (
      <div>
        <form className="mt-5" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Employee ID: </label>
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
              required
              className="form-control"
              value={this.state.empName}
              onChange={this.onChangeempName}
            />
          </div>
          <div>
            <label>Employee Salary: </label>
            <input
              type="number"
              className="form-control"
              onChange={this.onChangeempSal}
              value={this.state.empSal}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit"
              className="btn btn-primary mt-3"
            />
          </div>
        </form>
      </div>
    );
  }
}