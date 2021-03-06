import React, { Component } from 'react';

class UserSearch extends Component {

  // search form for users to invite - results render to InviteForm

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
          <p className="invite-message">{this.props.message}</p>

        </form>
      </div>
    );
  }

}

export default UserSearch;
