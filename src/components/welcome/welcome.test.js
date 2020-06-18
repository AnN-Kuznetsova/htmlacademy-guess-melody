import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {Welcome} from "./welcome.jsx";
import {ERRORS_COUNT} from "../../__test-data__/test-mocks.js";


const props = {
  errorCount: ERRORS_COUNT,
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
      .toEqual(`Можно допустить ${props.errorCount} ошибки.`);
  });
});
