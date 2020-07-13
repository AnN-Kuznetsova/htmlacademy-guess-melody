import React from "react";
import renderer from "react-test-renderer";
import {Mistakes} from "./mistakes";


describe(`Render Mistakes`, () => {
  it(`Render Mistakes should match with snapshot with zero count`, () => {
    const mistakesSnapshot = renderer.create(
        <Mistakes count={0} />
    ).toJSON();

    expect(mistakesSnapshot).toMatchSnapshot();
  });


  it(`Render Mistakes should match with snapshot with one count`, () => {
    const mistakesSnapshot = renderer.create(
        <Mistakes count={1} />
    ).toJSON();

    expect(mistakesSnapshot).toMatchSnapshot();
  });
});
