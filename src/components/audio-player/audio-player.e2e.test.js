import Adapter from "enzyme-adapter-react-16";
import React from 'react';
import {configure, shallow} from 'enzyme';

import {AudioPlayer} from './audio-player';


configure({adapter: new Adapter()});

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
