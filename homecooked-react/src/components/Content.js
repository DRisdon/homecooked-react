import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import DinnerList from "./DinnerList"
import SingleDinner from "./SingleDinner"
import NavBar from "./NavBar"


class Content extends Component {
  constructor(props) {
    super(props);
  }
// component that renders content
// this will render when there is a valid user
render() {
  return (
    <Switch>

      <Route exact="exact" path="/" render={props => <Redirect to="/dinners"/>} />
      <Route exact="exact" path="/dinners" render={props => <DinnerList {...props} {...this.props}/>}/>
      <Route  path="/dinners/:id" render={props => <SingleDinner {...props} {...this.props}/>}/>
    </Switch>)
}
}

export default Content;
