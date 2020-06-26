import React from "react";
import renderer from "react-test-renderer";
import {GuessArtistGame} from "./guess-artist-game.jsx";
import {artistQuestion} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const props = {
  question: artistQuestion,
  onAnswer: () => {},
};

const {answers, song} = props.question;

const artistQuestionScreenElement = shallow(<GuessArtistGame {...props} />);


describe(`Render ArtistQuestionScreen`, () => {
  it(`Should match with snapshot`, () => {
    const artistQuestionScreenSnapshot = renderer.create(
        <GuessArtistGame {...props} />
    ).toJSON();
    expect(artistQuestionScreenSnapshot).toMatchSnapshot();
  });

  it(`Should render correct song src`, () => {
    const audioTrack = artistQuestionScreenElement.find(`audio`);
    expect(audioTrack.prop(`src`)).toEqual(song.src);
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
