import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MAX_ERRORS_COUNT} from "../../__test-data__/test-mocks.js";
import {Welcome} from "./welcome.jsx";


const props = {
  maxErrorsCount: MAX_ERRORS_COUNT,
  onWelcomeButtonClick: () => {},
};


describe(`Render Welcome`, () => {
  it(`Should match with snapshot`, () => {
    const welcomeSnapshot = renderer.create(<Welcome {...props} />).toJSON();

    expect(welcomeSnapshot).toMatchSnapshot();
  });


  it(`Should render correct errors count`, () => {
    const welcomeElement = shallow(<Welcome {...props} />);

    expect(welcomeElement.find(`ul.welcome__rules-list li`).last().text())
      .toEqual(`Можно допустить ${props.maxErrorsCount} ошибки.`);
  });
});
