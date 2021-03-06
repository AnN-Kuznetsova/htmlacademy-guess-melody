import PropTypes from "prop-types";
import React, {PureComponent} from 'react';

import {AudioPlayerWithAudio as AudioPlayer} from "../../components/audio-player/audio-player.jsx";


export const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.step !== this.props.step) {
        this.setState({
          activePlayerId: 0,
        });
      }
    }

    handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    renderPlayer(src, id) {
      const {activePlayerId} = this.state;

      return (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this, id)}
          step={this.props.step}
        />
      );

    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={this.renderPlayer.bind(this)}
      />;
    }
  }


  WithActivePlayer.propTypes = {
    step: PropTypes.number.isRequired,
  };


  return WithActivePlayer;
};
