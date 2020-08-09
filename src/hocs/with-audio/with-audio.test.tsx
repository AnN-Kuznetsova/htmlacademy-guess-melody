import * as React from "react";
import * as renderer from "react-test-renderer";
import {mount} from 'enzyme';

import {withAudio} from "./with-audio";
import {noop} from "../../utils/utils";


const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

interface MockComponentProps {
  children: React.ReactNode | React.ReactNode[];
}

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  isPlaying: false,
  onPlayButtonClick: noop,
  step: 0,
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
