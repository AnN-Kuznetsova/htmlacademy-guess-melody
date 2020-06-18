import React from "react";
import {shallow} from "enzyme";
import {GenreQuestionScreen} from "./genre-question-screen.jsx";
import {questionGenre} from "../../__test-data__/test-mocks.js";


const props = {
  question: questionGenre,
  onAnswer: () => {},
};

// const genreQuestionScreenElement = shallow(<GenreQuestionScreen {...props} />);


describe(`GenreQuestionScreen e2e-tests`, () => {
  it(`When user answers genre question form is not sent`, () => {
    const onAnswer = jest.fn();
    props.onAnswer = onAnswer;

    const genreQuestionScreenElement = shallow(<GenreQuestionScreen {...props} />);

    const formElement = genreQuestionScreenElement.find(`form.game__tracks`);
    const formSendPrevention = jest.fn();

    formElement.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    props.onAnswer = onAnswer;

    const genreQuestionScreenElement = shallow(<GenreQuestionScreen {...props} />);

    const userAnswer = [false, true, false, false];
    const formElement = genreQuestionScreenElement.find(`form.game__tracks`);
    const inputTwo = formElement.find(`input.game__input`).at(1);

    inputTwo.simulate(`change`, {target: {checked: true}});
    formElement.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toMatchObject(props.question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
    expect(genreQuestionScreenElement.find(`input.game__input`).map((input) => input.prop(`checked`)))
      .toEqual(userAnswer);
  });
});
