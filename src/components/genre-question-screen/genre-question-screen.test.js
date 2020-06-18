import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {GenreQuestionScreen} from "./genre-question-screen.jsx";
import {questionGenre} from "../../__test-data__/test-mocks.js";


const props = {
  question: questionGenre,
  onAnswer: () => {},
};

const {answers, genre} = props.question;

const genreQuestionScreenElement = shallow(<GenreQuestionScreen {...props} />);


describe(`Render GenreQuestionScreen`, () => {
  it(`Should match with snapshot`, () => {
    const genreQuestionScreenSnapshot = renderer.create(
        <GenreQuestionScreen {...props} />
    ).toJSON();
    expect(genreQuestionScreenSnapshot).toMatchSnapshot();
  });


  it(`Should render correct genre`, () => {
    const gameTitleElement = genreQuestionScreenElement.find(`h2.game__title`);
    expect(gameTitleElement.text()).toEqual(`Выберите ${genre} треки`);
  });


  it(`Should render correct answers`, () => {
    const defaultUserAnswers = [false, false, false, false];
    const audioTracks = genreQuestionScreenElement.find(`audio`);
    const answersInputs = genreQuestionScreenElement.find(`input.game__input`);

    expect(audioTracks.map((track) => track.prop(`src`)))
      .toEqual(answers.map((answer) => answer.src));
    expect(answersInputs.map((input) => input.prop(`checked`)))
      .toEqual(defaultUserAnswers);
  });
});