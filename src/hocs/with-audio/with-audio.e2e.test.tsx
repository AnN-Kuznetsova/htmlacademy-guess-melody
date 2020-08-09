import * as React from "react";
import {mount} from 'enzyme';

import {withAudio} from "./with-audio";
import {noop} from "../../utils/utils";


window.HTMLMediaElement.prototype.play = noop;
window.HTMLMediaElement.prototype.pause = noop;

const MockComponent = (props: MockComponentProps) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

interface MockComponentProps {
  onPlayButtonClick: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const props = {
  src: ``,
  isPlaying: null,
  onPlayButtonClick: noop,
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

    const {audioRef} = mockComponentWithAudioElement.instance();
    const onPlay = jest.spyOn(audioRef.current, `play`);

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

    const {audioRef} = mockComponentWithAudioElement.instance();
    const onPause = jest.spyOn(audioRef.current, `pause`);

    mockComponentWithAudioElement.instance().componentDidMount();
    mockComponentWithAudioElement.find(`button`).simulate(`click`);

    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(mockComponentWithAudioElement.props().isPlaying).toEqual(false);
  });
});
