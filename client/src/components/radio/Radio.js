import React, { Component } from "react";
import axios from "axios";

class Radio extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    axios
      .get("http://api.sr.se/api/v2/programcategories?format=json&indent=true")
      .then(res => {
        console.log(res);
        this.setState({ categories: res.data.programcategories });
      });
  }
  render() {
    const { categories } = this.state;
    const catList = categories.length ? (
      categories.map(cat => {
        return (
          <div className="post card" key={cat.id}>
            <div className="card-content">
              <span className="card-title">{cat.name}</span>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No Categories</div>
    );
    return (
      <div className="container">
        <h1>Stations</h1>
        <h3 className="center">{catList}</h3>
      </div>
    );
  }
}

export default Radio;
