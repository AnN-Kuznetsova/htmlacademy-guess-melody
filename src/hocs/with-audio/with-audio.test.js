import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";
import {mount} from 'enzyme';

import {withAudio} from "./with-audio";


const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  isPlaying: false,
  onPlayButtonClick: () => {},
};

const MockComponentWithAudio = withAudio(MockComponent);


describe(`Render withAudio`, () => {
  it(`Should match with snapshot`, () => {
    const mockComponentWithAudioSnapshot = renderer.create(
        <MockComponentWithAudio {...props} />, nodeMock
    ).toJSON();

    expect(mockComponentWithAudioSnapshot).toMatchSnapshot();
  });


  it(`Should render correct song src`, () => {
    const mockComponentWithAudioElement = mount(<MockComponentWithAudio {...props} >
      <audio />
    </MockComponentWithAudio>, nodeMock);
    const audioElement = mockComponentWithAudioElement.find(`audio`);

    expect([...audioElement][0].ref.current.src).toEqual(props.src);
  });
});
