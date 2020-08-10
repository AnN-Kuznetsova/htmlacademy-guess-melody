import {GameType, GenreQuestionType, ArtistQuestionType} from "../types";

const MAX_ERRORS_COUNT = 3;

const genreQuestion: GenreQuestionType = {
  type: GameType.GENRE,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

const artistQuestion: ArtistQuestionType = {
  type: GameType.ARTIST,
  song: {
    artist: `Third`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `pic-one`,
    artist: `First`,
  }, {
    picture: `pic-two`,
    artist: `Second`,
  }, {
    picture: `pic-three`,
    artist: `Third`,
  }],
};


export {
  MAX_ERRORS_COUNT,
  artistQuestion,
  genreQuestion,
};
