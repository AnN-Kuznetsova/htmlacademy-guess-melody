import PropTypes from "prop-types";
import * as React from "react";
import {mount} from 'enzyme';

import {withAudio} from "./with-audio";


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
  step: 0,
};

const MockComponentWithAudio = withAudio(MockComponent);


describe(`withAudio e2e-tests`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {
    let isPlaying = false;
    const onPlayButtonClick = jest.fn(() => {
      isPlaying = !isPlaying;
      mockComponentWithAudioElement.setProps({isPlaying});
    });

    props.isPlaying = isPlaying;
    props.onPlayButtonClick = onPlayButtonClick;
    const mockComponentWithAudioElement = mount(<MockComponentWithAudio {...props} />);

    const {_audioRef} = mockComponentWithAudioElement.instance();
    const onPlay = jest.spyOn(_audioRef.current, `play`);

    mockComponentWithAudioElement.instance().componentDidMount();
    mockComponentWithAudioElement.find(`button`).simulate(`click`);

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(mockComponentWithAudioElement.props().isPlaying).toEqual(true);
  });


  it(`Checks that HOC's callback turn off audio (pause)`, () => {
    let isPlaying = true;
    const onPlayButtonClick = jest.fn(() => {
      isPlaying = !isPlaying;
      mockComponentWithAudioElement.setProps({isPlaying});
    });

    props.isPlaying = isPlaying;
    props.onPlayButtonClick = onPlayButtonClick;
    const mockComponentWithAudioElement = mount(<MockComponentWithAudio {...props} />);

    const {_audioRef} = mockComponentWithAudioElement.instance();
    const onPause = jest.spyOn(_audioRef.current, `pause`);

    mockComponentWithAudioElement.instance().componentDidMount();
    mockComponentWithAudioElement.find(`button`).simulate(`click`);

    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(mockComponentWithAudioElement.props().isPlaying).toEqual(false);
  });
});
