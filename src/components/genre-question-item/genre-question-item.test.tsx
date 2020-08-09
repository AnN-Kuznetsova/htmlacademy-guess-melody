import * as React from "react";
import * as renderer from "react-test-renderer";

import {GenreQuestionItem} from "./genre-question-item";
import {noop} from "../../utils/utils";


const props = {
  answer: {
    src: `answer-src`,
    genre: `answer-genre`,
  },
  id: 0,
  onChange: noop,
  renderPlayer: noop,
  userAnswer: false,
};


describe(`Render GenreQuestionItem`, () => {
  it(`Should match with snapshot`, () => {
    const genreQuestionItemSnapshot = renderer.create(
        <GenreQuestionItem {...props} />
    ).toJSON();

    expect(genreQuestionItemSnapshot).toMatchSnapshot();
  });
});
