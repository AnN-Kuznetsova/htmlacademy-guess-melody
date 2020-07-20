import React from 'react';
import {shallow} from 'enzyme';

import {AudioPlayer} from './audio-player';


const onPlayButtonClick = jest.fn();

const props = {
  isLoading: false,
  isPlaying: false,
  onPlayButtonClick,
};

const audioPlayerElement = shallow(
    <AudioPlayer {...props} >
      <audio />
    </AudioPlayer>
);


describe(`AudioPlayer e2e-tests`, () => {
  it(`Click by Play button calls callback`, () => {
    audioPlayerElement.find(`.track__button`).simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });
});
