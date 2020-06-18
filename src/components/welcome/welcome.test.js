import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import {Welcome} from "./welcome.jsx";


const props = {
  errorCount: 3,
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
