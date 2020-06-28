import React, {PureComponent} from 'react';
import {AudioPlayer} from "../../components/audio-player/audio-player.jsx";

export const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    _handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    _renderPlayer(src, id) {
      const {activePlayerId} = this.state;

      return (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this._handlePlayButtonClick.bind(this, id)}
        />
      );

    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={this._renderPlayer.bind(this)}
      />;
    }
  }


  WithAudioPlayer.propTypes = {};


  return WithAudioPlayer;
};
