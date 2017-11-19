import React, { Component } from 'react';

class RecipeResults extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='recipe-results'>
        {this.props.results.map((recipe, i) => {
          return <div className='recipe-result' data-index={i}>
            <img className='recipe-image-small' src={recipe.image_url}/>
            <div className='recipe-result-info'>
            <p>{recipe.name}</p>
            <p>Source: {recipe.source}</p>
            </div>
          </div>;
        })}
      </div>
    );
  }

}

export default RecipeResults;
