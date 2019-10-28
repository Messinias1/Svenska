import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class easySwe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: {},
      items: []
    };

    this.getAPI = this.getAPI.bind(this);
  }

  getAPI() {
    const parseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    const rssUrl = "https%3A%2F%2Fapi.sr.se%2Fapi%2Frss%2Fpod%2F22723";
    fetch(parseUrl + rssUrl)
      .then(response => response.json())
      .then(json => {
        if (json.status === "ok") {
          console.log(json);
          console.log(json.feed.image);
          console.log(json.items);
        } else {
          console.log("failed");
        }
        this.setState({ feed: json.feed });
        this.setState({ items: json.items });
      });
  }

  componentDidMount() {
    this.getAPI();
  }

  render() {
    const { feed } = this.state;
    const { items } = this.state;
    const itemList = items.map(item => {
      var audio = new Audio(item.enclosure.link);
      return (
        <Fragment>
          <div
            className="easySweCard"
            onClick={() => audio.play()}
            onDoubleClick={() => audio.pause()}
          >
            <img src={feed.image} alt="" id="feed-image" />
            <h1 className="easyTitle">{item.title}</h1>

            {/* <h1>{feed.title}</h1> */}
          </div>
        </Fragment>
      );
    });

    return (
      <div>
        <h1 className="large text-primary">
          <a href={feed.link}>{feed.title}</a>
        </h1>
        <p className="lead">{feed.description}</p>
        <Link className="m-lead" to="/radio">
          Back to Radio
        </Link>
        <div>{itemList}</div>
      </div>
    );
  }
}

export default easySwe;
