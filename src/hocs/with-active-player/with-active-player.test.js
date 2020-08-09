import React from "react";
import renderer from "react-test-renderer";

import {withActivePlayer} from "./with-active-player";


const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWithActivePlayer = withActivePlayer(MockComponent);


describe(`Render withActivePlayer`, () => {
  it(`Should match with snapshot`, () => {
    const mockComponentWithActivePlayerrSnapshot = renderer.create(
        <MockComponentWithActivePlayer step={0}/>
    ).toJSON();

    expect(mockComponentWithActivePlayerrSnapshot).toMatchSnapshot();
  });
});
