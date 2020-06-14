import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {WelcomeScreen} from "./welcome-screen.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`WelcomeScreen e2e-tests`, () => {
  it(`Should welcomeButton be pressed`, () => {
    const welcomeButtonClickHandler = jest.fn();

    const props = {
      errorCount: 3,
      welcomeButtonClickHandler,
    };

    const welcomeScreen = shallow(<WelcomeScreen {...props} />);
    const welcomeButton = welcomeScreen.find(`button.welcome__button`);

    welcomeButton.simulate(`click`);
    expect(welcomeButtonClickHandler).toHaveBeenCalled();
  });
});
