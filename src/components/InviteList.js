import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import NavBar from './NavBar'

class InviteList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invites: [],
      accepted: false,
      acceptedDinner: null
    };

    this.accept = this.accept.bind(this)
  }

  accept(e) {
    e.preventDefault();
    const id = e.target.dataset.id
    axios.post(`${this.props.url}/dinners/${id}/accept?auth_token=${this.props.user.token}`).then(res => {
      this.setState({ accepted: true, acceptedDinner: id })
  }
)}

  componentDidMount() {
      axios.get(`${this.props.url}/dinners/invited?auth_token=${this.props.user.token}`).then(res => {
        this.setState({ invites: res.data })
      })
  }

  render() {
    return (
      <div>
        <NavBar {...this.props}/>
        {this.state.accepted && <Redirect to={`dinners/${this.state.acceptedDinner}`}/>}
        <h1>Your Invites:</h1>
        <div className="invite-list">
        {this.state.invites.length > 0 && this.state.invites.map((invite, i) => {
          return (
            <div key={i} className="invite">
              <h3 className="invite-time">{moment(invite.info.starts_at).format("ddd, MMMM DD")}</h3>
              <h4 className="invite-host">Hosted by {invite.host.name}</h4>
              <h4 className="invite-location"> at {invite.info.location}</h4>
              <Link className="button" to={`/dinners/${invite.info.id}`}>More info</Link>
              <button data-id={invite.info.id} className="button" onClick={this.accept}>Accept invite</button>
            </div>
          )
        })}
      </div>
        {this.state.invites.length <= 0 && <h3>nothing here!</h3>}
      </div>
    );
  }

}

export default InviteList;
