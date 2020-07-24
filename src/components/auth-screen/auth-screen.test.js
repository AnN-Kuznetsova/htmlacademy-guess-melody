import React from "react";
import renderer from "react-test-renderer";

import {AuthScreen} from "./auth-screen";


const props = {
  onSubmit: () => {},
  onReplayButtonClick: () => {},
};

describe(`Render AuthScreen`, () => {
  it(`AuthScreen should match with snapshot`, () => {
    const authScreenSnapshot = renderer.create(
        <AuthScreen {...props} />
    ).toJSON();

    expect(authScreenSnapshot).toMatchSnapshot();
  });
});
