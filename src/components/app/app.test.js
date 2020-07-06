import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {MAX_ERRORS_COUNT, artistQuestion, genreQuestion} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  maxErrorsCount: MAX_ERRORS_COUNT,
  questions: [genreQuestion, artistQuestion],
  step: null,
  onWelcomeButtonClick: () => {},
  onUserAnswer: () => {},
};


describe(`Render App`, () => {
  it(`Render Welcome should match with snapshot`, () => {
    props.step = -1;
    const treeSnapshot = renderer.create(
        <App {...props} />
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesGenreGame should match with snapshot`, () => {
    props.step = 0;
    const treeSnapshot = renderer.create(
        <App {...props} />, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesArtistGame should match with snapshot`, () => {
    props.step = 1;
    const treeSnapshot = renderer.create(
        <App {...props} />, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });
});
