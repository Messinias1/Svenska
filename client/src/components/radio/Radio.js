import React, { Component } from "react";
import axios from "axios";

class Radio extends Component {
  state = {
    channels: []
  };

  componentDidMount() {
    axios
      .get("http://api.sr.se/api/v2/channels/?format=json&indent=true")
      .then(res => {
        console.log(res.data.channels);
        this.setState({ channels: res.data.channels });
      });
  }
  render() {
    const { channels } = this.state;
    const channelList = channels.length ? (
      channels.map(channel => {
        return (
          <div className="post card" key={channel.id}>
            <div className="card-content">
              <h1 className="large text-primary">{channel.name}</h1>
              <p>{channel.tagline}</p>
              <img src={channel.image} alt="" id="channel-image" />
              <p>
                <a href={channel.liveaudio.url}>Listen Here</a>
              </p>
              <p>
                <a href={channel.siteurl}>Go to site</a>
              </p>
              <div className="line" />
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No Categories</div>
    );
    return (
      <div className="container">
        <h1 className="large text-primary">Stations</h1>
        <p className="lead">
          <i className="fas fa-arrow-alt-circle-down">
            {" "}
            Learn Swedish By Listening to Radio Stations Below
          </i>
        </p>
        <div className="profiles">{channelList}</div>
      </div>
    );
  }
}

export default Radio;
