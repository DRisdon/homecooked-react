import React, { Component } from 'react';

class UserSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeQuery(e) {
    e.preventDefault();
    this.setState({
      query: e.target.value
    }, this.props.getResults(e.target.value))
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.getResults(this.state.query);
    this.setState({query: ''});
  }

  render() {
    return (
      <div>
        <form className="user-search" onSubmit={this.onSubmit}>
          <p>Invite Friends</p>
          <input className="search-bar" value={this.state.query} onChange={this.changeQuery}/>
          <input type='submit'/>

        </form>
      </div>
    );
  }

}

export default UserSearch;
