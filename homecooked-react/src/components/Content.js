import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import DinnerList from "./DinnerList"
import SingleDinner from "./SingleDinner"
import NavBar from "./NavBar"
import NewDinner from "./NewDinner"
import SearchWrapper from "./SearchWrapper"


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
      <Route exact="exact" path="/dinners/new" render={props => <NewDinner {...props} {...this.props}/>}/>
      <Route exact="exact" path="/dinners/:id" render={props => <SingleDinner {...props} {...this.props}/>}/>
      <Route exact="exact" path="/dinners/:id/addrecipe" render={props => <SearchWrapper {...props} {...this.props}/>}/>
    </Switch>

  )
}
}

export default Content;
