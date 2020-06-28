import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {GuessGenreGame} from "./guess-genre-game.jsx";
import {genreQuestion} from "../../__test-data__/test-mocks.js";


const props = {
  question: genreQuestion,
  onAnswer: () => {},
  renderPlayer: () => {},
};

const {genre} = props.question;

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const guessGenreGameElement = shallow(<GuessGenreGame {...props} />);


describe(`Render GuessGenreGame`, () => {
  it(`Should match with snapshot`, () => {
    const guessGenreGameSnapshot = renderer.create(
        <GuessGenreGame {...props} />, nodeMock
    ).toJSON();
    expect(guessGenreGameSnapshot).toMatchSnapshot();
  });


  it(`Should render correct genre`, () => {
    const gameTitleElement = guessGenreGameElement.find(`h2.game__title`);
    expect(gameTitleElement.text()).toEqual(`Выберите ${genre} треки`);
  });


  it(`Should render correct answers`, () => {
    const defaultUserAnswers = [false, false, false, false];
    const answersInputs = guessGenreGameElement.find(`input.game__input`);

    expect(answersInputs.map((input) => input.prop(`checked`)))
      .toEqual(defaultUserAnswers);
  });
});
