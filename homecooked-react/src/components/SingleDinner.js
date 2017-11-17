import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import {Link} from "react-router-dom"

class SingleDinner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dinner: {
        info: {},
        host: {},
        attendees: [],
        recipes: []
      }
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/dinners/${this.props.match.params.id}?auth_token=${this.props.user.token}`).then(res => {
      console.log(res.data);
      this.setState({ dinner: res.data })
    })
  }

  render() {
    return (
      <div>
        <h1>{moment(this.state.dinner.starts_at).format("ddd MM/DD")}</h1>
        {(this.state.dinner.host.id !== this.props.user.id) && <h2>hosted by {this.state.dinner.host.name}</h2>}
        {<h3>at {this.state.dinner.info.location}</h3>}
        <div>
          <h3>Recipes:</h3>
          {this.state.dinner.recipes.map(recipe => {
            return <p>{recipe.name}</p>;
          })}

        </div>
        <Link to="/dinners">Back</Link>
      </div>
    );
  }

}

export default SingleDinner;
