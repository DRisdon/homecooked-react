import React, { Component } from 'react';

class SelectedRecipe extends Component {

  render() {
    return (
      <div className="selected-recipe">
        <h1>{this.props.recipe.name}</h1>
        {this.props.recipe.source && <h2>Source: {this.props.recipe.source}</h2>}
        <img className="recipe-image-large" src={this.props.recipe.image_url}/><br/>
        {this.props.recipe.recipe_url && <a className="button" href={this.props.recipe.recipe_url} target="_blank">See the recipe</a>}<br/>
        {this.props.recipe.name && <button className="button" onClick={this.props.addRecipe}>Add this recipe</button>}
        {this.props.recipe.ingredients && <h3>Ingredients:</h3>}
        {this.props.recipe.ingredients && this.props.recipe.ingredients.map(ingredient => {
          return <li className="ingredient">{ingredient}</li>;
        })}
      </div>
    );
  }

}

export default SelectedRecipe;
