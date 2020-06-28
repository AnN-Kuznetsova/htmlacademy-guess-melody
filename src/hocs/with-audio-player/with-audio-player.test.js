import React from "react";
import renderer from "react-test-renderer";
import {withAudioPlayer} from "./with-audio-player.jsx";
import {mount} from "enzyme";


const Component = (props) => {
  return (
    <div {...props} />
  );
};


describe(`Render withAudioPlayer`, () => {
  it(`Should match with snapshot`, () => {
    const withAudioPlayerSnapshot = renderer.create(
        <withAudioPlayer Component={Component} />
    ).toJSON();

    expect(withAudioPlayerSnapshot).toMatchSnapshot();
  });


  /* it(`Transmitted Component is wrapped in withAudioPlayer`, () => {
    console.log([...mount(<Component {...{prop1: `aaa`}} />)][0].props);
    const withAudioPlayerElement = mount(<withAudioPlayer Component={Component} />);
    const componentWithAudioPlayer = [...withAudioPlayerElement][0].props.Component;

    //console.log([...withAudioPlayerElement][0].props.Component);
    //console.log(componentWithAudioPlayer().props);
    console.log(componentWithAudioPlayer);

    //expect()
    //expect(componentWithAudioPlayer.props.className).toEqual("form-group");
  }); */
});
