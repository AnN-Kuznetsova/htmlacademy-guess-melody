import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";
import {AuthorizationStatus} from "../../reducers/user/user.js";
import {NameSpace} from "../../reducers/name-space.js";

import {artistQuestion, genreQuestion} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render App`, () => {

  it(`Render Welcome should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: () => {},
      maxErrorsCount: 3,
      mistakes: 0,
      questions: [genreQuestion, artistQuestion],
      step: -1,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesGenreGame should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: () => {},
      maxErrorsCount: 3,
      mistakes: 0,
      questions: [genreQuestion, artistQuestion],
      step: 0,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GuesArtistGame should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: () => {},
      maxErrorsCount: 3,
      mistakes: 0,
      questions: [genreQuestion, artistQuestion],
      step: 1,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render AuthScreen should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: () => {},
      maxErrorsCount: 3,
      mistakes: 0,
      questions: [genreQuestion, artistQuestion],
      step: 3,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render GameOver should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 5,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: () => {},
      maxErrorsCount: 0,
      mistakes: 5,
      questions: [genreQuestion, artistQuestion],
      step: 1,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });


  it(`Render WinScreen should match with snapshot`, () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
        maxErrorsCount: 3,
        step: 3,
      },
      [NameSpace.DATA]: {
        questions: [genreQuestion, artistQuestion],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const props = {
      authorizationStatus: AuthorizationStatus.AUTH,
      login: () => {},
      maxErrorsCount: 3,
      mistakes: 0,
      questions: [genreQuestion, artistQuestion],
      step: 3,
      onWelcomeButtonClick: () => {},
      onUserAnswer: () => {},
      resetGame: () => {},
    };

    const treeSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(treeSnapshot).toMatchSnapshot();
  });
});
