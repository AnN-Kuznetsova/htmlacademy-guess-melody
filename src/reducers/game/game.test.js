import {reducer, ActionType, ActionCreator} from "./game.js";

import {artistQuestion, genreQuestion} from "../../__test-data__/test-mocks.js";


const initialState = {
  step: -1,
  mistakes: 0,
  maxErrorsCount: 3,
};


describe(`Game reducer should work correctly`, () => {
  it(`Game reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });


  it(`Game reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    });
  });


  it(`Game reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    });
  });


  it(`Game reducer should return default`, () => {
    expect(reducer({
      step: 5,
      mistakes: 1,
      maxErrorsCount: 3,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: 0,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxErrorsCount: 3,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxErrorsCount: 3,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      step: 0,
      mistakes: 0,
      maxErrorsCount: 3,
    });
  });
});


describe(`Game action creators should work correctly`, () => {
  it(`Game action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });


  it(`Game action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake(artistQuestion, {
      picture: `pic-three`,
      artist: `Third`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });


  it(`Game action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake(artistQuestion, {
      picture: `pic-one`,
      artist: `First`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });


  it(`Game action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake(genreQuestion, [true, false, false, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKES,
        payload: 0,
      });
  });


  it(`Game action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake(genreQuestion, [true, true, true, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKES,
        payload: 1,
      });
  });


  it(`Game action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });
});
