import * as React from "react";
import renderer from "react-test-renderer";
import {mount} from "enzyme";

import {GuessGenreGame} from "./guess-genre-game";
import {genreQuestion} from "../../__test-data__/test-mocks";


const props = {
  question: genreQuestion,
  renderPlayer: () => {},
  userAnswers: [false, false, false, false],
  onAnswer: () => {},
  onChange: () => {},
};

const {genre} = props.question;

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const guessGenreGameElement = mount(<GuessGenreGame {...props} />);


describe(`Render GuessGenreGame`, () => {
  it(`Should match with snapshot`, () => {
    let guessGenreGameSnapshot = renderer.create(
        <GuessGenreGame {...props} />, nodeMock
    ).toJSON();
    expect(guessGenreGameSnapshot).toMatchSnapshot();

    guessGenreGameSnapshot = renderer.create(
        <GuessGenreGame {...props} userAnswers={[false, true, false, false]} />, nodeMock
    ).toJSON();
    expect(guessGenreGameSnapshot).toMatchSnapshot();

    guessGenreGameSnapshot = renderer.create(
        <GuessGenreGame {...props} userAnswers={[true, true, false, true]} />, nodeMock
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
