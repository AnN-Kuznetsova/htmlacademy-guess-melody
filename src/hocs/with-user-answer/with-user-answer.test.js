import * as React from "react";
import renderer from "react-test-renderer";

import {withUserAnswer} from "./with-user-answer";

import {genreQuestion} from "../../__test-data__/test-mocks";


const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const props = {
  question: genreQuestion,
  onAnswer: () => {},
};

const MockComponentWithUserAnswer = withUserAnswer(MockComponent);

describe(`Render withUserAnswer`, () => {
  it(`Should match with snapshot`, () => {
    const MockComponentWithUserAnswerSnapshot = renderer.create(
        <MockComponentWithUserAnswer {...props} />
    ).toJSON();

    expect(MockComponentWithUserAnswerSnapshot).toMatchSnapshot();
  });
});
