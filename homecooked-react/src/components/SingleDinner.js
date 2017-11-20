import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import {Link, Redirect} from "react-router-dom"

class SingleDinner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dinner: {
        info: {},
        host: {},
        attendees: [],
        recipes: []
      },
      deleted: false
    };

    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({ dinner: res.data })
    })
  }

  delete(e) {
    e.preventDefault();
    axios.delete(`http://localhost:8080/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log('deleted!');
      this.setState({ deleted: true })
    })
  }

  render() {
    return (
      <div className="single-dinner">
        {this.state.deleted && <Redirect to="/dinners"/>}
        <h1>{moment(this.state.dinner.starts_at).format("ddd MM/DD")}</h1>
        {(this.state.dinner.host.id !== this.props.user.id) && <h2>Hosted by {this.state.dinner.host.name}</h2>}
        {<h3>at {this.state.dinner.info.location}</h3>}
        <div>
          <h3>Recipes:</h3>
          <div className="recipes-saved">
          {this.state.dinner.recipes.map(recipe => {
            return <Link to={`/dinners/${this.props.match.params.id}/recipes/${recipe.id}`} className="recipe-result-saved">
              <img className="recipe-image-small" src={recipe.image_url}/>
              <div className='recipe-result-info'>
              <p>{recipe.name}</p>
            </div>
            </Link>;
          })}
        </div>

        </div>
        <br/>
        {(this.state.dinner.host.id === this.props.user.id) && <Link className="button" to={`/dinners/${this.props.match.params.id}/addrecipe`}>Add a recipe</Link>}

        {(this.state.dinner.host.id === this.props.user.id) && <button className="button" onClick={this.delete}>Delete dinner</button>}
        <br/><br/>
        <Link className="button" to="/dinners">Back</Link>
      </div>
    );
  }

}

export default SingleDinner;
