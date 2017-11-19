import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class NavBar extends Component {

  render() {
    return (<div className="nav-bar">
      <Link to="/"><div className="logo">Homecooked</div></Link>
      <Link className="nav-link" to="/dinners">Your Dinners</Link>
      <Link className="nav-link" to="/dinners/invited">Invitations</Link>
      <Link className="nav-link" to="/dinners/new">New Dinner</Link>
      <button className="nav-link" onClick={this.props.logout}>Logout</button>
    </div>);
  }
}

export default NavBar;
