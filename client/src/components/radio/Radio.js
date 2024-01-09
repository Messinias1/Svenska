// import React, { Fragment, Component } from "react";
// import axios from "axios";

// class Radio extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       channels: [],
//     };

//     this.nextPage = this.nextPage.bind(this);
//   }

//   nextPage() {
//     axios
//       .get("http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60")
//       .then((res) => {
//         console.log(res.data.channels);
//         console.log(res.data.pagination);
//         this.setState({ channels: res.data.channels });
//       });
//   }

//   componentDidMount() {
//     this.nextPage();
//   }

//   render() {
//     const { channels } = this.state;
//     const channelList = channels.length ? (
//       channels.map((channel) => {
//         var audio = new Audio(channel.liveaudio.url);

//         return (
//           <Fragment className="row">
//             <div className="column">
//               <div className="card">
//                 <div className="card-content">
//                   <div className="overlay"></div>
//                   {/* <h1 className="large text-primary">{channel.name}</h1> */}
//                   <img
//                     src={channel.image}
//                     alt=""
//                     id="channel-image"
//                     onClick={() => audio.play()}
//                     onDoubleClick={() => audio.pause()}
//                   />
//                   <p className="m-lead">
//                     <a href={channel.siteurl}>Go to Site</a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Fragment>
//         );
//       })
//     ) : (
//       <div className="center">
//         <h1>End of Content Please Go Back To Starting Page</h1>
//       </div>
//     );
//     return (
//       <div>
//         <h1 className="large text-primary">Stations</h1>
//         <p className="lead">
//           <i className="fas fa-arrow-alt-circle-down">
//             {" "}
//             Learn Swedish By Listening to Radio Stations Below
//           </i>
//         </p>
//         <div>{channelList}</div>
//       </div>
//     );
//   }
// }

// export default Radio;

import React, { Fragment, Component } from "react";
import axios from "axios";

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      currentPlaying: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://api.sr.se/api/v2/channels/?format=json&indent=true&size=60")
      .then((res) => {
        this.setState({ channels: res.data.channels });
      });
  }

  playAudio = (url, channelId) => {
    const { currentPlaying } = this.state;

    // Stop the currently playing audio if there is one
    if (currentPlaying && currentPlaying.channelId !== channelId) {
      currentPlaying.audio.pause();
    }

    // Play the new audio or pause/resume the current one
    if (!currentPlaying || currentPlaying.channelId !== channelId) {
      const audio = new Audio(url);
      audio.play();

      this.setState({ currentPlaying: { audio, channelId } });
    } else {
      if (currentPlaying.audio.paused) {
        currentPlaying.audio.play();
      } else {
        currentPlaying.audio.pause();
      }
    }
  };
  //   render() {
  //     const { channels } = this.state;
  //     const channelList = channels.length ? (
  //       channels.map((channel) => {
  //         var audio = new Audio(channel.liveaudio.url);

  //         return (
  //           <Fragment className="row">
  //             <div className="column">
  //               <div className="card">
  //                 <div className="card-content">
  //                   <div className="overlay"></div>
  //                   {/* <h1 className="large text-primary">{channel.name}</h1> */}
  //                   <img
  //                     src={channel.image}
  //                     alt=""
  //                     id="channel-image"
  //                     onClick={() => }
  //                   />
  //                   <p className="m-lead">
  //                     <a href={channel.siteurl}>Go to Site</a>
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </Fragment>
  //         );
  //       })
  //     ) : (
  //       <div className="center">
  //         <h1>End of Content Please Go Back To Starting Page</h1>
  //       </div>
  //     );

  render() {
    const { channels } = this.state;

    const channelList = channels.length ? (
      <Fragment className="row">
        {channels.map((channel) => (
          <div key={channel.id} className="column">
            <div className="card">
              <div className="card-content">
                <div className="overlay"></div>
                <img
                  src={channel.image}
                  alt={channel.name}
                  onClick={() =>
                    this.playAudio(channel.liveaudio.url, channel.id)
                  }
                />
                <p>
                  <a href={channel.siteurl}>Go to Site</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    ) : (
      <div className="center">
        End of Content Please Go Back To Starting Page
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
        <div>{channelList}</div>
      </div>
    );
  }
}

export default Radio;
