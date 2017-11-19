import React, { Component } from 'react';
import RecipeSearch from "./RecipeSearch";
import RecipeResults from "./RecipeResults";
import axios from "axios";

class SearchWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeResults: [],
      currentRecipe: {},
    };

    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(query) {
    axios.get(`http://localhost:8080/recipes/search/${query}?auth_token=${this.props.user.id}`).then(res => {
      console.log(res.data);
      this.setState({
        recipeResults: res.data
      });
    });
    console.log('searched!');
  }

  render() {
    return (
      <div className="search-wrapper">
        <div>
        <RecipeSearch submitSearch={this.submitSearch}/>
        <RecipeResults results={this.state.recipeResults}/>
      </div>
        <div>
          recipes go here
        </div>
      </div>
    );
  }

}

export default SearchWrapper;
