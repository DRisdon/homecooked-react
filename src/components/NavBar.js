import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

class NavBar extends Component {

  // navigation, loads with each fullscreen component

  constructor(props) {
    super(props);
    this.state = {
      invites: null
    };
  }

  componentDidMount() {
    axios.get(`${this.props.url}/dinners/invited?auth_token=${this.props.user.token}`).then(res => {
      this.setState({ invites: res.data.length })
    })
  }


  render() {
    return (<div className="nav-bar">
      <Link to="/"><h1 className="logo">Homecooked</h1></Link>
      <p className="user-name">{this.props.user.name}</p>
      <div className="nav-links">
      <Link className="nav-link" to="/dinners">Your Dinners</Link>
      <Link className="nav-link" to="/invites">Invitations {this.state.invites > 0 && <span>{`(${this.state.invites})`}</span>}</Link>
      <Link className="nav-link" to="/dinners/new">New Dinner</Link>
      <span className="nav-link" onClick={this.props.logout}>Logout</span>
    </div>
    </div>);
  }
}

export default NavBar;
