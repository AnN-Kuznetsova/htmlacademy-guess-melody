import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GameType} from "../../const.js";


export const ArtistQuestionScreen = (props) => {
  return (

  );
};


ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf(Object.values(GameType)).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
