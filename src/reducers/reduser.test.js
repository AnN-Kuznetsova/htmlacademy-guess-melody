import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {artistQuestion, genreQuestion} from "../__test-data__/test-mocks.js";


const questions = [
  {
    type: `genre`,
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
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/A`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AB`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AC`,
      artist: `Jim Beam`,
    }],
  },
];

const initialState = {
  step: -1,
  mistakes: 0,
  questions,
  maxErrorsCount: 3,
};


describe(`Reduser should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });


  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    });
  });


  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
      questions,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      questions,
      maxErrorsCount: 3,
    });
  });


  it(`Reducer should correctly switch to the initial state`, () => {
    expect(reducer({
      step: 5,
      mistakes: 3,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      step: 5,
      mistakes: 4,
      questions,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: questions.length - 1,
      mistakes: 1,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual(initialState);

    expect(reducer({
      step: questions.length - 1,
      mistakes: 3,
      questions,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual(initialState);
  });

  expect(reducer({
    step: 1,
    mistakes: 4,
    questions,
    maxErrorsCount: 3,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual(initialState);
});


describe(`Action creators should work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });


  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake(artistQuestion, {
      picture: `pic-three`,
      artist: `Third`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });


  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake(artistQuestion, {
      picture: `pic-one`,
      artist: `First`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });


  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake(genreQuestion, [true, false, false, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKES,
        payload: 0,
      });
  });


  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake(genreQuestion, [true, true, true, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKES,
        payload: 1,
      });
  });
});
