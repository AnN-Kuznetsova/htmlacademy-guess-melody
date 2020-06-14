import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";
import {WelcomeScreen} from "./welcome-screen.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const props = {
  errorCount: 3,
  welcomeButtonClickHandler: () => {},
};


describe(`Render WelcomeScreen`, () => {
  it(`Render correctly WelcomeScreen component`, () => {
    const welcomeScreenComponent = renderer.create(<WelcomeScreen {...props} />).toJSON();
    expect(welcomeScreenComponent).toMatchSnapshot();
  });

  it(`Render correctly errors count`, () => {
    const welcomeScreenComponent = shallow(<WelcomeScreen {...props} />);
    expect(welcomeScreenComponent.find(`ul.welcome__rules-list li`).last().text())
      .toEqual(`Можно допустить ${props.errorCount} ошибки.`);
  });
});
