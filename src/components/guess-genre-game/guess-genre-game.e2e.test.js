import React from "react";
import {shallow} from "enzyme";
import {GuessGenreGame} from "./guess-genre-game.jsx";
import {genreQuestion} from "../../__test-data__/test-mocks.js";


const props = {
  question: genreQuestion,
  renderPlayer: () => {},
  userAnswers: [false, false, false, false],
  onAnswer: () => {},
  onChange: () => {},
};


describe(`GenreQuestionScreen e2e-tests`, () => {
  it(`User answer form sent`, () => {
    const onAnswer = jest.fn();
    props.onAnswer = onAnswer;

    const genreQuestionScreenElement = shallow(<GuessGenreGame {...props} />);

    const formElement = genreQuestionScreenElement.find(`form.game__tracks`);
    const formSendPrevention = jest.fn();

    formElement.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(formSendPrevention).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });


  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const userAnswer = [false, true, false, false];
    const onAnswer = jest.fn((...args) => [...args]);

    props.userAnswers = userAnswer;
    props.onAnswer = onAnswer;

    const genreQuestionScreenElement = shallow(<GuessGenreGame {...props} />);

    const formElement = genreQuestionScreenElement.find(`form.game__tracks`);
    const inputTwo = formElement.find(`input.game__input`).at(1);
    inputTwo.simulate(`change`, {target: {
      checked: true,
      dataset: {answerIndex: 1},
    }});
    formElement.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toEqual(void 0);
    expect(genreQuestionScreenElement.find(`input.game__input`).map((input) => input.prop(`checked`)))
      .toEqual(userAnswer);
  });
});
