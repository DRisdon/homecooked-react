import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import {Link, Redirect} from "react-router-dom"
import NavBar from "./NavBar"
import InviteForm from "./InviteForm"

class SingleDinner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dinner: {
        info: {},
        host: {},
        attendees: [],
        invited: [],
        recipes: []
      },
      deleted: false,
      mode: 'view'
    };

    this.delete = this.delete.bind(this);
    this.newInvite = this.newInvite.bind(this);
    this.closeInviteWindow = this.closeInviteWindow.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({ dinner: res.data })
    })
  }

  delete(e) {
    e.preventDefault();
    axios.delete(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log('deleted!');
      this.setState({ deleted: true })
    })
  }

  newInvite(e) {
    this.setState({ mode: 'invite', dimmed: 'dimmed' },
  );
  }

  closeInviteWindow(e) {
    e.preventDefault();
    this.setState({ mode: 'view', dimmed: '' });
  }

  render() {
    return (
      <div>
        <NavBar {...this.props}/>
      <div className="dinner-wrapper">
      <div className={`single-dinner ${this.state.dimmed}`}>
        {this.state.deleted && <Redirect to="/dinners"/>}
        <h1>{moment(this.state.dinner.starts_at).format("ddd MM/DD")}</h1>
        {(this.state.dinner.host.id !== this.props.user.id) && <h2>Hosted by {this.state.dinner.host.name}</h2>}
        {<h3>at {this.state.dinner.info.location}</h3>}
        {
          (this.state.dinner.attendees.length <= 0) &&
          (this.state.dinner.invited.length <= 0) &&
          (this.state.dinner.host.id === this.props.user.id) &&
          <button className="button" onClick={this.newInvite}>Invite friends</button>
        }
        <div>
          <h3>Recipes:</h3>
          <div className="recipes-saved">
          {this.state.dinner.recipes.map(recipe => {
            return <Link to={`/dinners/${this.props.match.params.id}/recipes/${recipe.id}`} className="recipe-result-saved">
              <img className="recipe-image-small" src={recipe.image_url}/>
              <div className='recipe-result-info'>
              <p>{recipe.name}</p>
            </div>
            </Link>;
          })}
        </div>

        </div>
        <br/>
        {(this.state.dinner.host.id === this.props.user.id) && <Link className="button" to={`/dinners/${this.props.match.params.id}/addrecipe`}>Add a recipe</Link>}

        {(this.state.dinner.host.id === this.props.user.id) && <button className="button" onClick={this.delete}>Delete dinner</button>}
        <br/><br/>
        <Link className="button" to="/dinners">Back to your list</Link>
      </div>
      {((this.state.dinner.attendees.length > 0) || (this.state.dinner.invited.length > 0)) &&
        <div className="user-list">
        <h1>Guests:</h1>
        {(this.state.dinner.host.id === this.props.user.id) &&<button className="button" onClick={this.newInvite}>Invite friends</button>}
        <h2>Attending:</h2>
        {this.state.dinner.attendees.map(user => <p>{user.name}</p>)}
        <h2>Invited:</h2>
        {this.state.dinner.invited.map(user => <p>{user.name}</p>)}
      </div>}
      {this.state.mode === 'invite' && <InviteForm dinner={this.state.dinner} {...this.props} close={this.closeInviteWindow}/>}
    </div>
  </div>
    );
  }

}

export default SingleDinner;
