import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {GenreQuestionScreen} from "./genre-question-screen.jsx";
import {questionGenre} from "../../__test-data__/test-mocks.js";


const props = {
  question: questionGenre,
  onAnswer: () => {},
};


describe(`Render GenreQuestionScreen`, () => {
  it(`Should match with snapshot`, () => {
    const genreQuestionScreenSnapshot = renderer.create(
        <GenreQuestionScreen {...props} />
    ).toJSON();
    expect(genreQuestionScreenSnapshot).toMatchSnapshot();
  });
});
