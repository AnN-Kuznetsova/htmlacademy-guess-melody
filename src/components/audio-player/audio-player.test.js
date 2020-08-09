import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from './audio-player';


const props = {
  isLoading: true,
  isPlaying: false,
  onPlayButtonClick: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render AudioPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const audioPlayerSnapshot = renderer.create(
        <AudioPlayer {...props} >
          <audio />
        </AudioPlayer>, nodeMock
    ).toJSON();

    expect(audioPlayerSnapshot).toMatchSnapshot();
  });
});
