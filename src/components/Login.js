import React, {Component} from 'react';
import axios from 'axios';

// login component
// this will render when the user auth mode is set to login
class Login extends Component {
  constructor() {
    super();
    // set default state
    this.state = {
      // we have 2 inputs that we will be changing
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  // method to log in
  login(e) {
    e.preventDefault(); // prevent default form action
    // send request to make sure the email and password are correct
    axios.post(`${this.props.url}/login`, this.state.inputs).then(res => { // set the user based off of the response
      this.props.setUser(res.data);
    })
  }

  // method to change an input
  changeInput(e, input) {
    const val = e.target.value;
    this.setState(prev => { // sets the state for that input to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render() {
    return (<div className="auth-form">
      <h1 class="home-logo">Homecooked</h1>
      <h2 class="home-tagline">Cook something new every night!</h2>
      <h2>Log In</h2>
      <form onSubmit={this.login.bind(this)}>

        <label htmlFor='email'>Email</label><br/>
        <input value={this.state.inputs.email} id='email' name='email' type='email' onChange={e => this.changeInput(e, 'email')}/>
        <br/><br/>
        <label htmlFor='password'>Password</label><br/>
        <input value={this.state.inputs.password} id='password' name='password' type='password' onChange={e => this.changeInput(e, 'password')}/>
        <br/>
        <div className="form-buttons"><br/>
          <button type="submit" className="form-button">Login</button><br/>
          <button onClick={this.props.toggleMode} className="form-button">Sign Up</button>
        </div>

      </form>
    </div>)
  }
}
export default Login;