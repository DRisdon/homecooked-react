import React, {Component} from 'react';
import NavBar from "./NavBar"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class DinnerTile extends Component {

  render() {
    return (
      <span>
      <Link className="dinner-link-wrapper" to={`/dinners/${this.props.dinner.info.id}`}>
      <div className="dinner-tile">
        <div className="dinner-date">
        <h3 className="dinner-link">{moment(this.props.dinner.info.starts_at).format("ddd, MMMM DD")}</h3>
        </div>
        {this.props.host && <p>hosted by {this.props.host}</p>}
        {this.props.dinner.recipes.map(recipe => <p>{recipe.name}</p>)}
      </div>
      </Link>
      </span>

    );
  }

}

export default DinnerTile;
