import React, {Component} from 'react';
import axios from "axios"
import UserSearch from "./UserSearch"
import { Redirect } from "react-router-dom"

class InviteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      invited: false,
      dinner: {
        info: {},
        host: {},
        attendees: [],
        invited: [],
        recipes: []
      },
      message: ''
    };

    this.getResults = this.getResults.bind(this);
    this.checkIfInvited = this.checkIfInvited.bind(this);
    this.invite = this.invite.bind(this);
  }

  componentDidMount() {
    this.setState({dinner: this.props.dinner})
  }

  getResults(query) {
    if (query.length > 0) {
      axios.get(`${this.props.url}/users/search/${query}?auth_token=${this.props.user.token}`).then(res => {
        console.log(res.data);
        this.setState({results: res.data, message: ''});
      });
    }
  }

  checkIfInvited(user) {
    for (let i = 0; i < this.state.dinner.invited.length; i++) {
      if (this.state.dinner.invited[i].id === user.id) {
        console.log('true');
        return true;
      }
    }
    for (let i = 0; i < this.state.dinner.attendees.length; i++) {
      if (this.state.dinner.attendees[i].id === user.id) {
        console.log('true');
        return true;

      }
    }
    console.log('false');
    return false;
  }

  invite(e) {
    e.preventDefault();
    axios.post(`${this.props.url}/dinners/${this.state.dinner.info.id}/invite?auth_token=${this.props.user.token}`,
      {invited_id: e.target.dataset.id}).then(res => {
      this.setState({invited: true, results: [], message: `${e.target.dataset.name} was invited!`});
    });
    this.state.dinner.invited.push({id: Number(e.target.dataset.id)})
  }

  render() {
    return (<div className="invite-form">
      <button className='close-button' onClick={this.props.close}>X</button>
      <UserSearch {...this.props} message={this.message} getResults={this.getResults}/>
      <div>
        {
          this.state.results.map((user, i) => (<div className="user-result" key={i}>
            <p>{user.name}</p>
            {this.state.dinner.host.id !== user.id && !this.checkIfInvited(user) &&
              <button data-name={user.name} data-id={user.id} className="button" onClick={this.invite}>Invite</button>}
            {this.state.dinner.host.id === user.id && <p className="host-warning">(host)</p>}
            {this.checkIfInvited(user) && <p className="host-warning">(already invited)</p>}
          </div>))
        }
      </div>
    </div>);
  }

}

export default InviteForm;
