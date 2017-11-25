import React, { Component } from 'react';
import RecipeSearch from "./RecipeSearch";
import RecipeResults from "./RecipeResults";
import SelectedRecipe from "./SelectedRecipe"
import axios from "axios";
import { Redirect } from "react-router-dom"
import Loading from "../loading.gif"
import NavBar from "./NavBar"

class SearchWrapper extends Component {

  // wrapper component for recipe search components (search form, results, selected view)

  constructor(props) {
    super(props);
    this.state = {
      recipeResults: [],
      currentRecipe: {},
      submitted: false,
      mode: 'search'
    };

    this.selectRecipe = this.selectRecipe.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.addRecipe = this.addRecipe.bind(this)
  }

  // submit search, set state, make api call
  submitSearch(query) {
    this.setState({
      recipeResults: [],
      mode: 'loading'
    })
    axios.get(`${this.props.url}/recipes/search/${query}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({
        recipeResults: res.data,
        mode: 'results'
      });
    });
    console.log('searched!');
  }

  // select a recipe to display, passed as props to recipe results component
  selectRecipe(index) {
    this.setState({
      currentRecipe: this.state.recipeResults[index]
    });
  }

  // add a recipe to an event - makes post call, and redirects
  addRecipe(e) {
    e.preventDefault();
    const recipe = {
      dinner_id: this.props.match.params.id,
      name: this.state.currentRecipe.name,
      source: this.state.currentRecipe.source,
      recipe_url: this.state.currentRecipe.recipe_url,
      image_url: this.state.currentRecipe.image_url,
      ingredients: this.state.currentRecipe.ingredients.join("; ")
    }
    axios.post(`${this.props.url}/recipes?auth_token=${this.props.user.token}`, recipe).then(res => {
      this.setState({
        submitted: true
      })
    })
  }

  render() {
    return (
      <div>
        <NavBar {...this.props}/>
      <div className="search-wrapper">
        {this.state.submitted && <Redirect to={`/dinners/${this.props.match.params.id}`}/>}
        <div>
        <RecipeSearch submitSearch={this.submitSearch}/>
        {this.state.mode === 'loading' && <img src={Loading} alt="loading" />}
        <RecipeResults results={this.state.recipeResults} selectRecipe={this.selectRecipe} mode={this.state.mode}/>
      </div>
        <div>
          <SelectedRecipe recipe={this.state.currentRecipe} addRecipe={this.addRecipe}/>
        </div>
      </div>
    </div>
    );
  }

}

export default SearchWrapper;
