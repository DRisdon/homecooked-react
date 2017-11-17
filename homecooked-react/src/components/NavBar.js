import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    return (<div>
      <button onClick={this.props.logout}>logout</button>
    </div>);
  }
}

export default NavBar;
