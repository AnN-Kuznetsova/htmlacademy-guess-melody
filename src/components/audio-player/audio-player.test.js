import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from './audio-player.jsx';
import {mount} from 'enzyme';


const song = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
};

const props = {
  src: song.src,
  isPlaying: false,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render AudioPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const audioPlayerSnapshot = renderer.create(
        <AudioPlayer {...props} />, nodeMock
    ).toJSON();

    expect(audioPlayerSnapshot).toMatchSnapshot();
  });


  it(`Should render correct song src`, () => {
    const audioPlayerElement = mount(<AudioPlayer {...props} />, nodeMock);
    const audioElement = audioPlayerElement.find(`audio`);

    expect([...audioElement][0].ref.current.src).toEqual(props.src);
  });
});
