import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {WinScreen} from "./win-screen";
import {history} from "../../history";
import {noop} from "../../utils/utils";


const props = {
  questionsCount: null,
  mistakesCount: null,
  onReplayButtonClick: noop,
};


describe(`Render WinScreen`, () => {
  it(`Should match with snapshot`, () => {
    props.questionsCount = 5;
    props.mistakesCount = 0;
    let winScreenSnapshot = renderer.create(
        <Router history={history} >
          <WinScreen {...props} />
        </Router>
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();

    props.questionsCount = 5;
    props.mistakesCount = 1;
    winScreenSnapshot = renderer.create(
        <Router history={history} >
          <WinScreen {...props} />
        </Router>
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();

    props.questionsCount = 3;
    props.mistakesCount = 2;
    winScreenSnapshot = renderer.create(
        <Router history={history} >
          <WinScreen {...props} />
        </Router>
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();
  });
});
