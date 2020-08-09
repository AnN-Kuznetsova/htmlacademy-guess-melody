import * as React from "react";
import * as renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {MAX_ERRORS_COUNT} from "../../__test-data__/test-mocks";
import {Welcome} from "./welcome";
import {noop} from "../../utils/utils";


const props = {
  maxErrorsCount: MAX_ERRORS_COUNT,
  onWelcomeButtonClick: noop,
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