import React, { Component } from 'react';

class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
        query: ''
    };

    this.changeQuery = this.changeQuery.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeQuery(e) {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      query: ''
    })
    this.props.submitSearch(this.state.query);
  }

  render() {
    return (
      <div>
       <form className="search-form" onSubmit={this.onSubmit}>

         <input className="search-bar"  value={this.state.query} onChange={this.changeQuery}/>
         <input type='submit'/>

       </form>
      </div>
    );
  }

}

export default RecipeSearch;
