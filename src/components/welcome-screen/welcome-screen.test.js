import React from "react";
import renderer from "react-test-renderer";
import {WelcomeScreen} from "./welcome-screen.jsx";


describe(`Render WelcomeScreen`, () => {
  it(`Render correctly WelcomeScreen component`, () => {
    const props = {
      errorCount: 3,
      welcomeButtonClickHandler: () => {},
    };

    const welcomeScreenComponent = renderer.create(<WelcomeScreen {...props} />).toJSON();

    expect(welcomeScreenComponent).toMatchSnapshot();
  });
});
