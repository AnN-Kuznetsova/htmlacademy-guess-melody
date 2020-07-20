import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {withUserAnswer} from "./with-user-answer";

import {genreQuestion} from "../../__test-data__/test-mocks";


configure({adapter: new Adapter()});

const MockComponent = () => <div />;

const props = {
  question: genreQuestion,
  onAnswer: () => {},
};

const MockComponentWithUserAnswer = withUserAnswer(MockComponent);
const MockComponentWithUserAnswerElement = shallow(<MockComponentWithUserAnswer {...props} />);

describe(`withUserAnswer e2e-tests`, () => {
  it(`Should change answers`, () => {
    expect(MockComponentWithUserAnswerElement.props().userAnswers).toEqual([false, false, false, false]);

    MockComponentWithUserAnswerElement.props().onChange(0, true);
    expect(MockComponentWithUserAnswerElement.props().userAnswers).toEqual([true, false, false, false]);

    MockComponentWithUserAnswerElement.props().onChange(0, false);
    expect(MockComponentWithUserAnswerElement.props().userAnswers).toEqual([false, false, false, false]);

    MockComponentWithUserAnswerElement.props().onChange(1, true);
    expect(MockComponentWithUserAnswerElement.props().userAnswers).toEqual([false, true, false, false]);
  });
});
