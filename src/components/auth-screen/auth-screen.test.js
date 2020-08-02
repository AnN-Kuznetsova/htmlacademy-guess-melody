import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {AuthScreen} from "./auth-screen";
import {history} from "../../history.js";


const props = {
  onSubmit: () => {},
  onReplayButtonClick: () => {},
};

describe(`Render AuthScreen`, () => {
  it(`AuthScreen should match with snapshot`, () => {
    const authScreenSnapshot = renderer.create(
        <Router history={history} >
          <AuthScreen {...props} />
        </Router>
    ).toJSON();

    expect(authScreenSnapshot).toMatchSnapshot();
  });
});
