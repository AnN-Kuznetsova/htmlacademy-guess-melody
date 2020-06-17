import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";


const props = {
  errorCount: 3,
};


describe(`Render App`, () => {
  it(`Should match with snapshot`, () => {
    const welcomeScreenSnapshot = renderer.create(<App {...props} />).toJSON();
    expect(welcomeScreenSnapshot).toMatchSnapshot();
  });
});
