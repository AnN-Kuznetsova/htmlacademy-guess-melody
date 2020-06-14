import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";


describe(`Render App`, () => {
  const props = {
    errorCount: 3,
  };

  it(`Render correctly App component`, () => {
    const welcomeScreenSnapshot = renderer.create(<App {...props} />).toJSON();
    expect(welcomeScreenSnapshot).toMatchSnapshot();
  });
});
