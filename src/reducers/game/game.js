import {MAX_ERRORS_COUNT, GameType} from "../../const.js";
import {extend} from "../../utils/utils.js";


const initialState = {
  mistakes: 0,
  step: -1,
  maxErrorsCount: MAX_ERRORS_COUNT,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
  GO_TO_WELCOME: `GO_TO_WELCOME`,
};


const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((answer, i) => {
    return answer === (question.genre === question.answers[i].genre);
  });
};


const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => ({
    type: ActionType.RESET,
    payload: null,
  }),

  goToWelcome: () => ({
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });

    case ActionType.GO_TO_WELCOME:
      return extend(initialState, {
        step: -1,
      });

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  reducer,
};
