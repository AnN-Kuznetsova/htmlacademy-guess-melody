enum GameType {
  ARTIST = `artist`,
  GENRE = `genre`,
};

interface AnswerArtistType {
  artist: string,
  picture: string,
};

interface AnswerGenreType {
  genre: string,
  src: string,
};

interface GenreQuestionType {
  answers: AnswerGenreType[],
  genre: string,
  type: GameType.GENRE,
};

interface ArtistQuestionType {
  answers: AnswerArtistType[],
  song: {
    artist: string,
    src: string,
  },
  type: GameType.ARTIST,
};


export {
  GameType,
  AnswerArtistType,
  AnswerGenreType,
  ArtistQuestionType,
  GenreQuestionType,
};
