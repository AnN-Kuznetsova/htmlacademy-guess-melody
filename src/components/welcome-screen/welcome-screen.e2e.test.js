import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {WelcomeScreen} from "./welcome-screen.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`WelcomeScreen e2e-tests`, () => {
  const onWelcomeButtonClick = jest.fn();

  const props = {
    errorCount: 3,
    onWelcomeButtonClick,
  };

  const welcomeScreenElement = shallow(<WelcomeScreen {...props} />);

  it(`Should welcomeButton be pressed`, () => {
    const welcomeButton = welcomeScreenElement.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalled();
  });
});
