import React, {Component} from 'react';
import NavBar from "./NavBar"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class EmptyDinnerTile extends Component {

  // empty tile, acting as a button to create a new event

  render() {
    return (
      <span>
      <Link className="empty-dinner-link-wrapper" to={`/dinners/new`}>
      <div className="empty-dinner-tile">
        <div className="empty-dinner-date">
        <h3 className="empty-dinner-link">Add a dinner</h3>
        </div>
        <div className="add-circle">+</div>
      </div>
      </Link>
      </span>

    );
  }

}

export default EmptyDinnerTile;
