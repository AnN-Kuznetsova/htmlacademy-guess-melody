import React from "react";
import renderer from "react-test-renderer";

import {GameOverScreen} from "./game-over-screen";


describe(`Render GameOverScreen`, () => {
  it(`Should match with snapshot`, () => {
    const gameOverScreenSnapshot = renderer.create(
        <GameOverScreen onReplayButtonClick={() => {}} />
    ).toJSON();

    expect(gameOverScreenSnapshot).toMatchSnapshot();
  });
});
