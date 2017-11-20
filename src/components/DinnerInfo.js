import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import {Link, Redirect} from "react-router-dom"

class DinnerInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`single-dinner ${this.props.dimmed}`}>
        {this.props.deleted && <Redirect to="/dinners"/>}
        <h1>{moment(this.props.dinner.starts_at).format("ddd MM/DD")}</h1>
        {(this.props.dinner.host.id !== this.props.user.id) && <h2>Hosted by {this.props.dinner.host.name}</h2>}
        {<h3>at {this.props.dinner.info.location}</h3>}
        {(this.props.dinner.attendees.length <= 0)
          && (this.props.dinner.invited.length <= 0)
          && (this.props.dinner.host.id === this.props.user.id)
          && <button className="button" onClick={this.props.newInvite}>Invite friends</button>}
        <div>
          <h3>Recipes:</h3>
          {this.props.dinner.recipes.length <= 0 && <p>Nothing here yet!</p>}
          <div className="recipes-saved">
            {
              this.props.dinner.recipes.map(recipe => {
                return <Link to={`/dinners/${this.props.match.params.id}/recipes/${recipe.id}`} className="recipe-result-saved">
                  <img className="recipe-image-small" src={recipe.image_url}/>
                  <div className='recipe-result-info'>
                    <p>{recipe.name}</p>
                  </div>
                </Link>;
              })
            }
          </div>
        </div>
        <br/> {(this.props.dinner.host.id === this.props.user.id)
          && <Link className="button" to={`/dinners/${this.props.match.params.id}/addrecipe`}>Add a recipe</Link>}

        {(this.props.dinner.host.id === this.props.user.id) && <button className="button" onClick={this.props.delete}>Delete dinner</button>}
        <br/><br/>
        <Link className="button" to="/dinners">Back to your list</Link>
      </div>
    );
  }

}

export default DinnerInfo;
