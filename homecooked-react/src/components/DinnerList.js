import React, {Component} from 'react';
import NavBar from "./NavBar"
import DinnerTile from "./DinnerTile"
import EmptyDinnerTile from "./EmptyDinnerTile"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class DinnerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dinners: {
        hosting: [],
        attending: []
      },
      user: this.props.user
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/dinners?auth_token=${this.props.user.token}`).then(res => {
      // console.log(res);
      this.setState({
        dinners: res.data
      })
    })
  }

  render() {
    return (<div>
      <h2>Hosting</h2>
      <div className="dinner-list">
        {this.state.dinners.hosting.map((dinner) => <DinnerTile dinner={dinner} user={this.props.user} kind=""/>)}
        <EmptyDinnerTile user={this.props.user}/>
      </div>
      <h2>Attending</h2>
      <div className="dinner-list">
        {this.state.dinners.attending.map((dinner) => <DinnerTile dinner={dinner} host={dinner.host.name} user={this.props.user} kind="attending-"/>)}
        {this.state.dinners.attending.length === 0 && <p>Nothing here yet!</p>}
      </div>
    </div>);
  }
}

export default DinnerList;
