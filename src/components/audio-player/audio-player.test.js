import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from './audio-player.jsx';


const song = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
};

const props = {
  src: song.src,
  isPlaying: false,
};


describe(`Render AudioPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const audioPlayerSnapshot = renderer.create(
        <AudioPlayer {...props} />
    ).toJSON();

    expect(audioPlayerSnapshot).toMatchSnapshot();
  });
});
