import React, {Component} from 'react';
import axios from "axios"
import moment from "moment"
import {Link, Redirect} from "react-router-dom"
import NavBar from "./NavBar"
import InviteForm from "./InviteForm"
import DinnerInfo from "./DinnerInfo"
import DinnerGuests from "./DinnerGuests"

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
    this.checkIfInvited = this.checkIfInvited.bind(this);
    this.uninviteUser = this.uninviteUser.bind(this);
    this.removeSelf = this.removeSelf.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({dinner: res.data})
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.mode === 'invite' && this.state.mode === 'view') || (prevState.mode === 'view' && this.state.mode === 'uninvited')) {
      axios.get(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
        console.log(res.data);
        this.setState({dinner: res.data, mode: 'view'})
      });
    }
  }

  delete(e) {
    e.preventDefault();
    axios.delete(`${this.props.url}/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log('deleted!');
      this.setState({deleted: true})
    })
  }

  newInvite(e) {
    this.setState({
      mode: 'invite',
      dimmed: 'dimmed'
    },);
  }

  closeInviteWindow(e) {
    e.preventDefault();
    this.setState({mode: 'view', dimmed: ''});
  }

  checkIfInvited(userId) {
    for (let i = 0; i < this.state.dinner.invited.length; i++) {
      if (this.state.dinner.invited[i].id === userId) {
        console.log('true');
        return 'invited';
      }
    }
    for (let i = 0; i < this.state.dinner.attendees.length; i++) {
      if (this.state.dinner.attendees[i].id === userId) {
        console.log('true');
        return 'attending';
      }
    }
    console.log('false');
    return false;
  }

  uninviteUser(e) {
    e.preventDefault();
    const userId = Number(e.target.dataset.id);
    console.log('uninviting user ' + userId);
    if (this.checkIfInvited(userId) === 'invited') {
      axios.delete(`${this.props.url}/dinners/${this.state.dinner.info.id}/invites/${userId}?auth_token=${this.props.user.token}`).then(res => {
        this.setState({ mode: 'uninvited' })
      })
    }
    else if (this.checkIfInvited(userId) === 'attending') {
      axios.delete(`${this.props.url}/dinners/${this.state.dinner.info.id}/attendees/${userId}?auth_token=${this.props.user.token}`).then(res => {
        this.setState({ mode: 'uninvited' })
      })
    }
  }

  removeSelf(e) {
    e.preventDefault();
    const userId = this.props.user.id;
    console.log('uninviting user ' + userId);
    if (this.checkIfInvited(userId) === 'invited') {
      axios.delete(`${this.props.url}/dinners/${this.state.dinner.info.id}/invites/${userId}?auth_token=${this.props.user.token}`).then(res => {
        this.setState({ mode: 'removeself' })
      })
    }
    else if (this.checkIfInvited(userId) === 'attending') {
      axios.delete(`${this.props.url}/dinners/${this.state.dinner.info.id}/attendees/${userId}?auth_token=${this.props.user.token}`).then(res => {
        this.setState({ mode: 'removeself' })
      })
    }
  }

  render() {
    return (<div>
      <NavBar {...this.props}/>
      <div className="dinner-wrapper">

        <DinnerInfo {...this.props}
          dinner={this.state.dinner}
          deleted={this.state.deleted}
          delete={this.delete}
          newInvite={this.newInvite}/>

        <DinnerGuests {...this.props}
          dinner={this.state.dinner}
          newInvite={this.newInvite}
          checkIfInvited={this.checkIfInvited}
          uninviteUser={this.uninviteUser}
          removeSelf={this.removeSelf}/>

        {this.state.mode === 'invite' && <InviteForm dinner={this.state.dinner} {...this.props} close={this.closeInviteWindow}/>}
        {this.state.mode === 'removeself' && <Redirect to="/dinners"/>}
      </div>
    </div>);
  }

}

export default SingleDinner;
