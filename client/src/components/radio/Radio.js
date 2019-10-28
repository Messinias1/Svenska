import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: []
    };

    this.nextPage = this.nextPage.bind(this);
    // this.play = this.play.bind(this);
    // this.pause = this.pause.bind(this);
  }

  nextPage() {
    axios
      .get("http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60")
      .then(res => {
        console.log(res.data.channels);
        console.log(res.data.pagination);
        this.setState({ channels: res.data.channels });
      });
  }

  // play() {
  //   const { channels } = this.state;
  //   var audio = new Audio(channels.map(channel => channel.liveaudio.url));
  //   this.setState({ playing: true });
  //   audio.play();
  // }
  // pause() {
  //   const { channels } = this.state;
  //   var audio = new Audio(channels.map(channel => channel.liveaudio.url));
  //   this.setState({ playing: false });
  //   audio.pause();
  // }

  componentDidMount() {
    this.nextPage();
    // this.play();
    // this.pause();
  }

  render() {
    const { channels } = this.state;
    const channelList = channels.length ? (
      channels.map(channel => {
        var audio = new Audio(channel.liveaudio.url);

        return (
          <Fragment className="row">
            <div className="column">
              <div className="card">
                <div className="card-content">
                  {/* <div class="overlay"></div> */}
                  {/* <h1 className="large text-primary">{channel.name}</h1> */}
                  <img
                    src={channel.image}
                    alt=""
                    id="channel-image"
                    onClick={() => audio.play()}
                    onDoubleClick={() => audio.pause()}
                  />

                  {/* <p className="m-lead">{channel.tagline}</p> */}
                  {/* <p className="lead">
                    {" "}
                    <audio controls id="aud">
                      <source src={channel.liveaudio.url} type="audio/mpeg" />
                      <source src={channel.liveaudio.url} type="audio/ogg" />
                      <source src={channel.liveaudio.url} type="audio/wav" />
                    </audio>
                    <a href={channel.liveaudio.url}>Listen Now!</a>
                  </p> */}
                  <p className="m-lead">
                    <a href={channel.siteurl}>Go to Site</a>
                  </p>
                </div>
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
      <div>
        <h1 className="large text-primary">Stations</h1>
        <p className="lead">
          <i className="fas fa-arrow-alt-circle-down">
            {" "}
            Learn Swedish By Listening to Radio Stations Below
          </i>
        </p>
        <Link to="/easySwe" className="m-lead">
          Easy Swedish
        </Link>
        <div>{channelList}</div>
      </div>
    );
  }
}

export default Radio;
