import React from "react";
import renderer from "react-test-renderer";
import {withAudioPlayer} from "./with-audio-player.jsx";


const Component = (props) => {
  return (
    <div {...props} />
  );
};


describe(`Render withAudioPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const withAudioPlayerSnapshot = renderer.create(
        <withAudioPlayer Component={Component} />
    ).toJSON();

    expect(withAudioPlayerSnapshot).toMatchSnapshot();
  });
});
