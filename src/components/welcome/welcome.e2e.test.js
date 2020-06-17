import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import {Welcome} from "./welcome.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const onWelcomeButtonClick = jest.fn();

const props = {
  errorCount: 3,
  onWelcomeButtonClick,
};

const welcomeScreenElement = shallow(<Welcome {...props} />);


describe(`WelcomeScreen e2e-tests`, () => {
  it(`Should welcomeButton be pressed`, () => {
    const welcomeButton = welcomeScreenElement.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalled();
  });
});
