import {createSelector} from "reselect";

import {NameSpace} from "../name-space";


const NAME_SPASE = NameSpace.DATA;


const randomFilter = () => {
  return Math.random() > 0.5;
};

const getQuestions = (state) => {
  return state[NAME_SPASE].questions;
};

const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (questions, filter) => {
      return questions.filter((question) => filter && question.type === `artist`);
    }
);

const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((question) => question.type === `genre`);
    }
);


export {
  getQuestions,
  getArtistQuestions,
  getGenreQuestions,
};
