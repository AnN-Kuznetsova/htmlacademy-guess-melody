import * as React from "react";
import {MAX_ERRORS_COUNT} from "../../__test-data__/test-mocks";
import {Welcome} from "./welcome";
import {shallow} from "enzyme";


const mockEvent = {
  preventDefault() {},
  target: {},
};

const onWelcomeButtonClick = jest.fn();

const props = {
  maxErrorsCount: MAX_ERRORS_COUNT,
  onWelcomeButtonClick,
};

const welcomeElement = shallow(<Welcome {...props} />);


describe(`Welcome e2e-tests`, () => {
  it(`Should welcomeButton be pressed`, () => {
    const welcomeButton = welcomeElement.find(`button.welcome__button`);
    welcomeButton.simulate(`click`, mockEvent);

    expect(onWelcomeButtonClick).toHaveBeenCalled();
  });
});
