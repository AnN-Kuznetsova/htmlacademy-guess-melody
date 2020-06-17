import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {Welcome} from "./welcome.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`Render Welcome`, () => {
  const props = {
    errorCount: 3,
    onWelcomeButtonClick: () => {},
  };

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
