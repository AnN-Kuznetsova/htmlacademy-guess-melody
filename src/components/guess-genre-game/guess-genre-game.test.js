import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {GuessGenreGame} from "./guess-genre-game.jsx";
import {genreQuestion} from "../../__test-data__/test-mocks.js";


const props = {
  question: genreQuestion,
  onAnswer: () => {},
};

const {answers, genre} = props.question;

const genreQuestionScreenElement = shallow(<GuessGenreGame {...props} />);


describe(`Render GenreQuestionScreen`, () => {
  it(`Should match with snapshot`, () => {
    const genreQuestionScreenSnapshot = renderer.create(
        <GuessGenreGame {...props} />
    ).toJSON();
    expect(genreQuestionScreenSnapshot).toMatchSnapshot();
  });


  it(`Should render correct genre`, () => {
    const gameTitleElement = genreQuestionScreenElement.find(`h2.game__title`);
    expect(gameTitleElement.text()).toEqual(`Выберите ${genre} треки`);
  });


  it(`Should render correct answers`, () => {
    const defaultUserAnswers = [false, false, false, false];
    const audioPlayers = genreQuestionScreenElement.find(`AudioPlayer`);
    const answersInputs = genreQuestionScreenElement.find(`input.game__input`);

    expect(audioPlayers.map((player) => player.prop(`src`)))
      .toEqual(answers.map((answer) => answer.src));
    expect(answersInputs.map((input) => input.prop(`checked`)))
      .toEqual(defaultUserAnswers);
  });
});
