import * as React from "react";
import * as renderer from "react-test-renderer";
import {shallow} from "enzyme";

import {GuessArtistGame} from "./guess-artist-game";
import {noop} from "../../utils/utils";

import {artistQuestion} from "../../__test-data__/test-mocks";


const props = {
  question: artistQuestion,
  onAnswer: noop,
  renderPlayer: noop,
};

const {answers} = props.question;

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const artistQuestionScreenElement = shallow(<GuessArtistGame {...props} />);


describe(`Render GuessArtistGame`, () => {
  it(`Should match with snapshot`, () => {
    const guessArtistGameSnapshot = renderer.create(
        <GuessArtistGame {...props} />, nodeMock
    ).toJSON();

    expect(guessArtistGameSnapshot).toMatchSnapshot();
  });


  it(`Should render correct answers`, () => {
    const answersArtists = answers.map((answer) => answer.artist);
    const artistElements = artistQuestionScreenElement.find(`label.artist__name`);
    const artistsAvatars = artistElements.map((artistElement) => artistElement.find(`img`));

    expect(artistElements.map((artist) => artist.text()))
      .toEqual(answersArtists);
    expect(artistsAvatars.map((artistAvatar) => artistAvatar.prop(`src`)))
      .toEqual(answers.map((answer) => answer.picture));
    expect(artistsAvatars.map((artistAvatar) => artistAvatar.prop(`alt`)))
      .toEqual(answersArtists);
  });
});
