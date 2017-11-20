import React, { Component } from 'react';

class DinnerGuests extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {((this.props.dinner.attendees.length > 0) || (this.props.dinner.invited.length > 0)) && <div className="user-list">
              <h1>Guests</h1>
              {
                (this.props.dinner.host.id === this.props.user.id) &&
                <button className ="button" onClick={this.props.newInvite}>Invite friends</button>
              }
              {this.props.dinner.attendees.length > 0 && <h2>Attending:</h2>}
              {this.props.dinner.attendees.map(user =>
                <div className="user-result">
                  <p>{user.name}</p>
                {(this.props.dinner.host.id === this.props.user.id)
                  && <button className="button" data-id={user.id} onClick={this.props.uninviteUser}>Uninvite</button>}
                </div>)}
              { this.props.dinner.invited.length > 0 && <h2>Invited:</h2>}
              {this.props.dinner.invited.map(user =>
                <div className="user-result">
                <p>{user.name}</p>
              {(this.props.dinner.host.id === this.props.user.id)
                && <button className="button" data-id={user.id} onClick={this.props.uninviteUser}>Uninvite</button>}
              </div>)}
              {this.props.checkIfInvited(this.props.user.id)
                && <button className="button" data-id={this.props.user.id} onClick={this.props.removeSelf}>Remove self from dinner</button>}
            </div>
        }
      </div>
    );
  }

}

export default DinnerGuests;
