import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import React from "react";
import {configure, mount} from 'enzyme';

import {withAudio} from "./with-audio";


configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

const MockComponent = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const props = {
  src: ``,
  isPlaying: null,
  onPlayButtonClick: () => {},
};

const MockComponentWithAudio = withAudio(MockComponent);


describe(`withAudio e2e-tests`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {
    props.isPlaying = false;
    const mockComponentWithAudioElement = mount(<MockComponentWithAudio {...props} />);

    const {_audioRef} = mockComponentWithAudioElement.instance();
    const onPlay = jest.spyOn(_audioRef.current, `play`);

    mockComponentWithAudioElement.instance().componentDidMount();
    mockComponentWithAudioElement.find(`button`).simulate(`click`);

    expect(onPlay).toHaveBeenCalledTimes(1);
  });


  it(`Checks that HOC's callback turn off audio (pause)`, () => {
    props.isPlaying = true;
    const mockComponentWithAudioElement = mount(<MockComponentWithAudio {...props} />);

    const {_audioRef} = mockComponentWithAudioElement.instance();
    const onPause = jest.spyOn(_audioRef.current, `pause`);

    mockComponentWithAudioElement.instance().componentDidMount();
    mockComponentWithAudioElement.find(`button`).simulate(`click`);

    expect(onPause).toHaveBeenCalledTimes(1);
  });
});
