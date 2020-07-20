import React from "react";
import renderer from "react-test-renderer";

import {GenreQuestionItem} from "./genre-question-item";


const props = {
  answer: {
    src: `answer-src`,
    genre: `answer-genre`,
  },
  id: 0,
  onChange: () => {},
  renderPlayer: () => {},
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
