import React, { Component } from 'react';
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import NavBar from "./NavBar"

class SingleRecipe extends Component {

  // single recipe view - allows deleting

  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        ingredients: []
      },
      dinner: {
        host: {}
      },
      deleted: false
    };

    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    axios.get(`${this.props.url}/recipes/${this.props.match.params.recipeid}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({ recipe: res.data })
    })
    axios.get(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({ dinner: res.data })
    })
  }

  delete(e) {
    e.preventDefault();
    axios.delete(`${this.props.url}/recipes/${this.props.match.params.recipeid}?auth_token=${this.props.user.token}`).then(res => {
      console.log('deleted!');
      this.setState({ deleted: true })
    })
  }

  render() {
    return (
      <div>
        <NavBar {...this.props}/>
      <div className="single-recipe">
        {this.state.deleted && <Redirect to={`/dinners/${this.props.match.params.id}`}/>}
        <div className="single-recipe-left">
        <h1>{this.state.recipe.name}</h1>
        <img className="recipe-image-large" src={this.state.recipe.image_url}/><br/>
        <h3>Source: <a href={this.state.recipe.recipe_url} target="_blank">{this.state.recipe.source}</a></h3>
      </div>
        <div className="single-recipe-right">
          <h3>Ingredients:</h3>
          <div>
          {this.state.recipe.ingredients.map(ingredient => {
            return <div className="ingredients">
              <li className="ingredient">{ingredient}</li>
            </div>;
          })}
        </div>
        <br/>
        {(this.state.dinner.host.id === this.props.user.id) && <div><button className="button" onClick={this.delete}>Delete this recipe</button><br/><br/></div>}
        <Link className="button" to={`/dinners/${this.props.match.params.id}`}>Back</Link>
        </div>
      </div>
    </div>
    );
  }
}
export default SingleRecipe;
