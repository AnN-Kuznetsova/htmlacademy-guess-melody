import React from "react";
import {shallow} from "enzyme";
import {Welcome} from "./welcome.jsx";
import {ERRORS_COUNT} from "../../__test-data__/test-mocks.js";


const onWelcomeButtonClick = jest.fn();

const props = {
  errorsCount: ERRORS_COUNT,
  onWelcomeButtonClick,
};

const welcomeElement = shallow(<Welcome {...props} />);


describe(`Welcome e2e-tests`, () => {
  it(`Should welcomeButton be pressed`, () => {
    const welcomeButton = welcomeElement.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalled();
  });
});
