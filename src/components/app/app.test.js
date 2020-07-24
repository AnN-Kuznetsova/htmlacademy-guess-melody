import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";
import {AuthorizationStatus} from "../../reducers/user/user.js";
import {NameSpace} from "../../reducers/name-space.js";

import {MAX_ERRORS_COUNT, artistQuestion, genreQuestion} from "../../__test-data__/test-mocks.js";


const mockStore = configureStore([]);

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const props = {
  maxErrorsCount: MAX_ERRORS_COUNT,
  mistakes: 0,
  questions: [genreQuestion, artistQuestion],
  step: null,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  onWelcomeButtonClick: () => {},
  onUserAnswer: () => {},
  resetGame: () => {},
  login: () => {},
};


describe(`Render App`, () => {
  it(`Render Welcome should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    props.step = -1;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesGenreGame should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    props.step = 0;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesArtistGame should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    props.step = 1;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render AuthScreen should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    props.step = 3;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render WinScreen should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    props.step = 3;
    props.authorizationStatus = AuthorizationStatus.AUTH;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GameOver should match with snapshot`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    props.step = 1;
    props.mistakes = 4;

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });
});
