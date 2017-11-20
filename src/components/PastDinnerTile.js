import React, {Component} from 'react';
import NavBar from "./NavBar"
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class PastDinnerTile extends Component {

  render() {
    const threeRecipes = [];
    for (let i = 0; i < 3; i += 1) {
      if (this.props.dinner.recipes[i]) {
      threeRecipes.push(<p key={i} className="recipe-on-tile">{this.props.dinner.recipes[i].name}</p>)
    }
    }
    return (
      <span>
      <Link className="dinner-link-wrapper" to={`/dinners/${this.props.dinner.info.id}`}>
      <div className="dinner-tile">
        <div className={`${this.props.kind}dinner-date`}>
        <h3 className="dinner-link">{moment(this.props.dinner.info.starts_at).format("ddd, MMMM DD")}</h3>
        {this.props.host && <h4 className="dinner-link">Hosted by {this.props.host}</h4>}
        </div>
        <div className="tile-recipes">
        {threeRecipes.map(recipe => recipe)}
        {this.props.dinner.recipes.length > 3 && <p> and more.. </p>}
      </div>
      </div>
      </Link>
      </span>

    );
  }

}

export default PastDinnerTile;
