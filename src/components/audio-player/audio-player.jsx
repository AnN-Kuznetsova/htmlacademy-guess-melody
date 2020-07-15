import PropTypes from "prop-types";
import React from "react";

import {withAudio} from "../../hocs/with-audio/with-audio.jsx";


const AudioPlayer = (props) => {
  const {isLoading, isPlaying, onPlayButtonClick, children} = props;

  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {children}
      </div>
    </React.Fragment>
  );
};


AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


const AudioPlayerWithAudio = withAudio(AudioPlayer);


export {
  AudioPlayer,
  AudioPlayerWithAudio,
};
