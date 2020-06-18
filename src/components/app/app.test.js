import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {ERRORS_COUNT, questions} from "../../__test-data__/test-mocks.js";


const props = {
  errorsCount: ERRORS_COUNT,
  questions,
};


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const welcomeScreenSnapshot = renderer.create(<App {...props} />).toJSON();
    expect(welcomeScreenSnapshot).toMatchSnapshot();
  });
});
