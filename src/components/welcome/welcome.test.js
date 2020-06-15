import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {Welcome} from "./welcome.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`Render WelcomeScreen`, () => {
  const props = {
    errorCount: 3,
    onWelcomeButtonClick: () => {},
  };

  it(`Should match with snapshot`, () => {
    const welcomeScreenSnapshot = renderer.create(<Welcome {...props} />).toJSON();
    expect(welcomeScreenSnapshot).toMatchSnapshot();
  });

  it(`Should render correct errors count`, () => {
    const welcomeScreenElement = shallow(<Welcome {...props} />);
    expect(welcomeScreenElement.find(`ul.welcome__rules-list li`).last().text())
      .toEqual(`Можно допустить ${props.errorCount} ошибки.`);
  });
});
