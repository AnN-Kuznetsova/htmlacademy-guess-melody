import React from "react";
import renderer from "react-test-renderer";

import {WinScreen} from "./win-screen.jsx";


const props = {
  questionsCount: null,
  mistakesCount: null,
  onReplayButtonClick: () => {},
};


describe(`Render WinScreen`, () => {
  it(`Should match with snapshot`, () => {
    props.questionsCount = 5;
    props.mistakesCount = 0;
    let winScreenSnapshot = renderer.create(
        <WinScreen {...props} />
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();

    props.questionsCount = 5;
    props.mistakesCount = 1;
    winScreenSnapshot = renderer.create(
        <WinScreen {...props} />
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();

    props.questionsCount = 3;
    props.mistakesCount = 2;
    winScreenSnapshot = renderer.create(
        <WinScreen {...props} />
    ).toJSON();
    expect(winScreenSnapshot).toMatchSnapshot();
  });
});
