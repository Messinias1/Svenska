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
    this.startPage = this.startPage.bind(this);
  }

  nextPage() {
    axios
      .get(
        `http://api.sr.se/api/v2/channels/?format=json&indent=true&page=${this.state.page}`
      )
      .then(res => {
        console.log(res.data.channels);
        console.log(res.data.pagination);
        this.setState({ page: this.state.page + 1 });
        this.setState({ channels: res.data.channels });
      });

    console.log(this.state.page);
  }

  startPage() {
    axios
      .get("http://api.sr.se/api/v2/channels/?format=json&indent=true&page=1")
      .then(res => {
        console.log(res.data.pagination);
        this.setState({ page: 2 });
        this.setState({ channels: res.data.channels });
      });
    console.log(this.state.page);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.nextPage();
    this.startPage();
  }

  render() {
    const { channels } = this.state;
    const channelList = channels.length ? (
      channels.map(channel => {
        return (
          <Fragment key={channel.id}>
            <div className="card">
              <div className="card-content">
                <h1 className="large text-primary">{channel.name}</h1>
                <p className="m-lead">{channel.tagline}</p>
                <img src={channel.image} alt="" id="channel-image" />
                <p className="lead">
                  {" "}
                  <audio controls>
                    <source src={channel.liveaudio.url} type="audio/mpeg" />
                    <source src={channel.liveaudio.url} type="audio/ogg" />
                    <source src={channel.liveaudio.url} type="audio/wav" />
                  </audio>
                  {/* <a href={channel.liveaudio.url}>Listen Now!</a> */}
                </p>
                <p className="lead">
                  <a href={channel.siteurl}>Go to {channel.name}'s Website</a>
                </p>
              </div>
            </div>
          </Fragment>
        );
      })
    ) : (
      <div className="center">
        <h1>End of Content Please Go Back To Starting Page</h1>
      </div>
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
        <Fragment>
          {this.state.page > 2 ? (
            <div>
              <button className="btn btn-primary" onClick={this.startPage}>
                Start Page
              </button>
              <button className="btn btn-primary" onClick={this.nextPage}>
                Next Page
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={this.nextPage}>
              Next Page
            </button>
          )}
        </Fragment>
        <div>{channelList}</div>
        <Fragment>
          {this.state.page > 2 ? (
            <div>
              <button className="btn btn-primary" onClick={this.startPage}>
                Start Page
              </button>
              <button className="btn btn-primary" onClick={this.nextPage}>
                Next Page
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={this.nextPage}>
              Next Page
            </button>
          )}
        </Fragment>
      </div>
    );
  }
}

export default Radio;
