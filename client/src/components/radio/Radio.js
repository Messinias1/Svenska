import React, { Fragment, Component } from "react";
import axios from "axios";

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      page: 1
    };

    this.nextPage = this.nextPage.bind(this);
  }

  nextPage() {
    axios
      .get(
        `http://api.sr.se/api/v2/channels/?format=json&indent=true&page=${this.state.page}`
      )
      .then(res => {
        console.log(res.data.channels);
        console.log(res.data.pagination.nextpage);
        this.setState({ page: this.state.page + 1 });
        this.setState({ channels: res.data.channels });
      });

    console.log(this.state.page);
  }

  componentDidMount() {
    this.nextPage();
  }

  render() {
    const { channels } = this.state;
    const channelList = channels.length ? (
      channels.map(channel => {
        return (
          <Fragment key={channel.id}>
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
          </Fragment>
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
        <div>
          <button onClick={this.nextPage}>Next Page</button>
        </div>
        <div className="profiles">{channelList}</div>
        <div>
          <button onClick={this.nextPage}>Next Page</button>
        </div>
      </div>
    );
  }
}

export default Radio;
