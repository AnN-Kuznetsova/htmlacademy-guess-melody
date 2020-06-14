import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {WelcomeScreen} from "./welcome-screen.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`Render WelcomeScreen`, () => {
  const props = {
    errorCount: 3,
    onWelcomeButtonClick: () => {},
  };

  it(`Should match with snapshot`, () => {
    const welcomeScreenSnapshot = renderer.create(<WelcomeScreen {...props} />).toJSON();
    expect(welcomeScreenSnapshot).toMatchSnapshot();
  });

  it(`Should render correct errors count`, () => {
    const welcomeScreenElement = shallow(<WelcomeScreen {...props} />);
    expect(welcomeScreenElement.find(`ul.welcome__rules-list li`).last().text())
      .toEqual(`Можно допустить ${props.errorCount} ошибки.`);
  });
});
