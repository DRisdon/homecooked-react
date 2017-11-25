import React, {Component} from 'react';
import NavBar from "./NavBar"
import DinnerTile from "./DinnerTile"
import EmptyDinnerTile from "./EmptyDinnerTile"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"
import PastDinnerTile from "./PastDinnerTile"

class DinnerList extends Component {

  // component for rendering a list of all the user's dinners

  constructor(props) {
    super(props);
    this.state = {
      dinners: {
        hosting: [],
        attending: []
      },
      pastDinners: {
        hosting: [],
        attending: []
      },
      user: this.props.user
    }
  }

  // backend api call
  componentDidMount() {
    axios.get(`${this.props.url}/dinners?auth_token=${this.props.user.token}`).then(res => {
      // console.log(res);
      this.setState({
        dinners: res.data
      });
    });
    axios.get(`${this.props.url}/dinners/past?auth_token=${this.props.user.token}`).then(res => {
      // console.log(res);
      this.setState({
        pastDinners: res.data
      })
    })
  }

  render() {
    return (<div>
      <NavBar {...this.props}/>
      <h1>Upcoming Dinners</h1>
      <h2>Your Dinners</h2>
      <div className="dinner-list">
        {/* hosted upcoming dinners */}
        {this.state.dinners.hosting.map((dinner) => <DinnerTile dinner={dinner} user={this.props.user} kind=""/>)}
        <EmptyDinnerTile user={this.props.user}/>
      </div>
      <h2>Dinners You're Attending</h2>
      <div className="dinner-list">
        {/* attending upcoming dinners */}
        {this.state.dinners.attending.map((dinner) => <DinnerTile dinner={dinner} host={dinner.host.name} user={this.props.user} kind="attending-"/>)}
        {this.state.dinners.attending.length === 0 && <p>Nothing here yet!</p>}
      </div>
      <h1>Past Dinners</h1>
      <h2>Your Dinners</h2>
      <div className="dinner-list">
        {/* hosted past dinners */}
        {this.state.pastDinners.hosting.map((dinner) => <PastDinnerTile dinner={dinner} user={this.props.user} kind=""/>)}
        {this.state.pastDinners.hosting.length === 0 && <p>Nothing here!</p>}
      </div>
      <h2>Dinners You Attended</h2>
      <div className="dinner-list">
        {/* attended past dinners */}
        {this.state.pastDinners.attending.map((dinner) => <PastDinnerTile dinner={dinner} host={dinner.host.name} user={this.props.user} kind="attending-"/>)}
        {this.state.pastDinners.attending.length === 0 && <p>Nothing here!</p>}
      </div>
    </div>);
  }
}

export default DinnerList;
