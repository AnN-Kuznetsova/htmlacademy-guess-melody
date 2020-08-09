import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {AudioPlayer} from './audio-player';
import {noop} from "../../utils/utils";


const props = {
  isLoading: true,
  isPlaying: false,
  onPlayButtonClick: noop,
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
