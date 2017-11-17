import React, {Component} from 'react';
import NavBar from "./NavBar"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class DinnerTile extends Component {

  render() {
    return (
      <div>
        <Link to={`/dinners/${this.props.dinner.info.id}`}>{moment(this.props.dinner.info.starts_at).format("ddd MM/DD")}</Link>
        {this.props.host && <p>hosted by {this.props.host}</p>}
        {this.props.dinner.recipes.map(recipe => <p>{recipe.name}</p>)}
      </div>
    );
  }

}

export default DinnerTile;
