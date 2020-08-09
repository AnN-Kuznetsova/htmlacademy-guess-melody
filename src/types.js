import PropTypes from "prop-types";
import {GameType} from "./const";


const GenreQuestionsPropType = PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    genre: PropTypes.string,
  })),
  genre: PropTypes.string,
  type: PropTypes.oneOf(Object.values(GameType)),
});

const ArtistQuestionsPropType = PropTypes.shape({
  answers: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string,
    artist: PropTypes.string,
  })),
  song: PropTypes.shape({
    artist: PropTypes.string,
    src: PropTypes.string,
  }),
  type: PropTypes.oneOf(Object.values(GameType)),
});


export {
  ArtistQuestionsPropType,
  GenreQuestionsPropType,
};
