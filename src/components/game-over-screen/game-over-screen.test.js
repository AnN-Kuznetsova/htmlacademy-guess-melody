import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {GameOverScreen} from "./game-over-screen.jsx";
import {history} from "../../history.js";


describe(`Render GameOverScreen`, () => {
  it(`Should match with snapshot`, () => {
    const gameOverScreenSnapshot = renderer.create(
        <Router history={history}>
          <GameOverScreen onReplayButtonClick={() => {}} />
        </Router>
    ).toJSON();

    expect(gameOverScreenSnapshot).toMatchSnapshot();
  });
});
