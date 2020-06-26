import React from "react";
import {GuessArtistGame} from "./guess-artist-game.jsx";
import {artistQuestion} from "../../__test-data__/test-mocks.js";
import {shallow} from "enzyme";


const mockEvent = {
  preventDefault() {}
};

const onAnswer = jest.fn();

const props = {
  question: artistQuestion,
  onAnswer,
};

const artistQuestionScreenElement = shallow(<GuessArtistGame {...props} />);


describe(`ArtistQuestionScreen e2e-tests`, () => {
  it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
    const userAnswer = {
      artist: `First`,
      picture: `pic-one`,
    };

    const answerInputs = artistQuestionScreenElement.find(`input.artist__input`);
    const answerOne = answerInputs.at(0);
    answerOne.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toMatchObject(props.question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
