import React, { Component } from 'react';

class RecipeResults extends Component {

  // search results for recipe search

  constructor(props) {
    super(props);

    this.selectRecipe = this.selectRecipe.bind(this)
  }

  // select recipe to display in SelectedRecipe component
  selectRecipe(e) {
    e.preventDefault();
    console.log('recipe ' + e.target.dataset.index + ' selected!');
    this.props.selectRecipe(e.target.dataset.index);
  }

  render() {
    return (
      <div className='recipe-results'>
        {this.props.results.map((recipe, i) => {
          return <div className='recipe-result' data-index={i} onClick={this.selectRecipe}>
            <img className='recipe-image-small' data-index={i} src={recipe.image_url}/>
            <div className='recipe-result-info' data-index={i}>
            <p data-index={i}>{recipe.name}</p>
            <p data-index={i}>Source: {recipe.source}</p>
            </div>
          </div>;
        })}
      </div>
    );
  }

}

export default RecipeResults;
