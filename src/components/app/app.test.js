import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";


describe(`Render App`, () => {
  it(`Render correctly App component`, () => {
    const props = {
      errorCount: 3,
    };

    const welcomeScreenComponent = renderer.create(<App {...props} />).toJSON();

    expect(welcomeScreenComponent).toMatchSnapshot();
  });
});
