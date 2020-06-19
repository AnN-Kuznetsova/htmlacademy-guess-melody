import {arrayOf, func, number, object, oneOf, string, shape} from "prop-types";
import {GameType} from "./const.js";


const errorsCountType = number;

const questionsType = arrayOf(object);

const questionGenreType = shape({
  answers: arrayOf(shape({
    src: string,
    genre: string,
  })),
  genre: string,
  type: oneOf(Object.values(GameType)),
});

const questionArtistType = shape({
  answers: arrayOf(shape({
    picture: string,
    artist: string,
  })),
  song: shape({
    artist: string,
    src: string,
  }),
  type: oneOf(Object.values(GameType)),
});

const callbackType = func;


export {
  errorsCountType,
  questionArtistType,
  questionGenreType,
  questionsType,
  callbackType,
};
