import React, {Component} from 'react';
import axios from "axios";
import {Redirect, Link} from "react-router-dom"
import NavBar from "./NavBar"
import moment from "moment"
import DateTime from 'react-datetime'

class NewDinner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      starts_at: '',
      submitted: false,
      submittedId: null
    };
    this.changeLocation = this.changeLocation.bind(this);

    this.changeTime = this.changeTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  // onChange function that updates the input value
  // of the name of the dinner
  changeLocation(e) {
    e.preventDefault();
    this.setState({location: e.target.value});
  };

  // onChange function that updates the input value
  // of the time of the dinner
  changeTime(date) {
    // e.preventDefault();
    this.setState({starts_at: date})
  };

  // onSubmit function that saves the input
  // values to the database as a new dinner
  onSubmit(dinner) {
    console.log('submit clicked');
    dinner.preventDefault();
    const { location, starts_at } = this.state;
    axios.post(`${this.props.url}/dinners?auth_token=${this.props.user.token}`, {location, starts_at}).then(response => {
      console.log(response);
      const id = response.data.info.id;
      this.props.history.push(`/dinners/${id}`);
    })
  };

  // function that renders a form to create a new dinner and
  // redirect to all dinners when the new dinner is submitted
  render() {
    var yesterday = DateTime.moment().subtract( 1, 'day' );
    var valid = current => {
      return current.isAfter( yesterday );
    }

    if (this.state.submitted) {
      return <Redirect to={`/dinners`}/>
    }
    return (
      <div>
        <NavBar {...this.props}/>
        <h2>New Dinner</h2>
        <form  className="dinner-form" onSubmit={this.onSubmit}>
          <label>
            Date/Time:
          </label>
          <br/>
          <DateTime value={this.state.starts_at} onChange={this.changeTime} isValidDate={ valid }/>
          {/* <input type='datetime-local' value={this.state.starts_at} onChange={this.changeTime}/> */}
          <br/>
          <br/>
          <label>
            Location:
          </label>
          <br/>
          <input type='text' value={this.state.location} onChange={this.changeLocation}/>
          <br/>
          <br/>
          <input type='submit' value='Submit'/>
        </form>
        <br/>
        <Link className="button" to="/dinners">Back</Link>
      </div>);
  }

};

export default NewDinner;
