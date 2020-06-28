import React from 'react';
import {AudioPlayer} from './audio-player';
import {mount} from 'enzyme';


const onPlayButtonClick = jest.fn();

const props = {
  src: ``,
  isPlaying: false,
  onPlayButtonClick,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const audioPlayerElement = mount(<AudioPlayer {...props} />, nodeMock);
const audioElement = audioPlayerElement.find(`audio`);
[...audioElement][0].ref.current.play = () => {};
[...audioElement][0].ref.current.pause = () => {};


describe(`AudioPlayer e2e-tests`, () => {
  describe(`when isPlaying is false`, () => {
    it(`Should playButton be pressed and state be change and the callback be called`, () => {
      const playButtonElement = audioPlayerElement.find(`button.track__button`);
      [...playButtonElement][0].props.onClick();

      expect(audioPlayerElement.state().isPlaying).toBeTruthy();
      expect(onPlayButtonClick).toHaveBeenCalled();
    });
  });

  describe(`when isPlaying is true`, () => {
    it(`Should playButton be pressed and state be change and the callback be called`, () => {
      audioPlayerElement.setState({
        isPlaying: true,
      });
      const playButtonElement = audioPlayerElement.find(`button.track__button`);
      [...playButtonElement][0].props.onClick();

      expect(audioPlayerElement.state().isPlaying).toBeFalsy();
      expect(onPlayButtonClick).toHaveBeenCalled();
    });
  });
});
