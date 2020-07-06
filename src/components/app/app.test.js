import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {MAX_ERRORS_COUNT, artistQuestion, genreQuestion} from "../../__test-data__/test-mocks.js";
import {Provider} from "react-redux";


const mockStore = configureStore([]);

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
    const store = mockStore({
      mistakes: 0,
    });

    props.step = -1;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <App {...props} />
        </Provider>
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesGenreGame should match with snapshot`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    props.step = 0;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <App {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesArtistGame should match with snapshot`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    props.step = 1;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <App {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });
});
