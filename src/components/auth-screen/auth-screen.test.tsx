import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {AuthScreen} from "./auth-screen";
import {history} from "../../history";
import {noop} from "../../utils/utils";


const props = {
  onSubmit: noop,
  onReplayButtonClick: noop,
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
