import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Cookies from '../helpers/Cookies';
import UserAuth from './UserAuth';
import Content from './Content';
import NavBar from './NavBar'
import { BrowserRouter} from "react-router-dom";
import Loading from '../loading.gif'

class App extends Component {
  constructor(){
    super();
    // set up our state.
    this.state = {
      user: false, // default user is no user
      // the app needs to do a request, so there will be a loading time
      // we want to display something else while it does that
      mode: 'loading',
      // url for the API we are using - uncomment the one you want to use

      // Express
      url: 'http://localhost:8080',

      // Rails
      // url: 'http://localhost:3000',
    }


  }

  // once the component mounted, we want to initialize our user
  componentDidMount(){
    this.initUser();
  }


  // method to initialize our user
  initUser(){
    // get the token from the cookie
    const token = Cookies.get('token');

    // if there is a token
    if(token && token !== ''){
      // send a request to our API to validate the user
      axios.get(`${this.state.url}/users/validate`, {
        // include the token as a parameter
        params: {auth_token: token}})
        .then(res => { // the response will be the user
          // set the user in the state, and change the mode to content
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => { // if there is an error
          Cookies.set('token', '') // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false, mode: 'auth'});
        })
    } else { // if there is no token
      // we should render the auth forms
      this.setState({mode: 'auth'});
    }
  }

  // method to set a user
  setUser(user){
    // set a cookie with the user's token
    Cookies.set('token', user.token);
    // set state to have the user and the mode to content
    this.setState({user: user, mode: 'content'});
  }

  // method to log out
  logout(){
    // take away the cookie
    Cookies.set('token', '');
    // remove the user and set the mode to auth
    this.setState({user: false, mode: 'auth'}, window.location.replace("/"));
  }

  // method that renders the view based on the mode in the state
  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src={Loading}
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else if(this.state.mode === 'content') {
      return (
        <div>
        <BrowserRouter>
          <div>
          {/* <NavBar logout={this.logout.bind(this)} user={this.state.user}/> */}
          <Content url={this.state.url} logout={this.logout.bind(this)} user={this.state.user} toggleDimmed={this.toggleDimmed}/>
          </div>
        </BrowserRouter>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderView() }
      </div>
    );
  }
}

export default App;
