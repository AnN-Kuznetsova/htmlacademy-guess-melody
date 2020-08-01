import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/game/game.js";
import {AppRoute, GameType} from "../../const.js";
import {AuthorizationStatus} from "../../reducers/user/user.js";
import {AuthScreen} from "../auth-screen/auth-screen.jsx";
import {GameOverScreen} from "../game-over-screen/game-over-screen.jsx";
import {GameScreen} from "../game-screen/game-screen.jsx";
import {GuessArtistGameWithPlayer} from "../guess-artist-game/guess-artist-game.jsx";
import {GuessGenreGameWithPlayer} from "../guess-genre-game/guess-genre-game.jsx";
import {Operation as UserOperation} from "../../reducers/user/user.js";
import {PrivateRoute} from "../private-route/private-route.jsx";
import {Welcome} from "../welcome/welcome.jsx";
import {WinScreen} from "../win-screen/win-screen.jsx";
import {getStep, getMistakes, getMaxErrorsCount} from "../../reducers/game/selectors.js";
import {getQuestions} from "../../reducers/data/selectors.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";
import {history} from "../../history.js";


const AppComponent = (props) => {
  const {
    authorizationStatus,
    login,
    maxErrorsCount,
    mistakes,
    questions,
    step,
    onWelcomeButtonClick,
    onUserAnswer,
    resetGame,
  } = props;

  const renderGame = () => {
    const question = questions[step];

    if (step === -1) {
      return (
        <Welcome
          maxErrorsCount={maxErrorsCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes > maxErrorsCount) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return (
          <WinScreen
            questionsCount={questions.length}
            mistakesCount={mistakes}
            onReplayButtonClick={resetGame}
          />
        );
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <AuthScreen
            onSubmit={login}
            onReplayButtonClick={resetGame}
          />
        );
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <GuessArtistGameWithPlayer
                question={question}
                onAnswer={onUserAnswer}
                step={step}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GuessGenreGameWithPlayer
                question={question}
                onAnswer={onUserAnswer}
                step={step}
              />
            </GameScreen>
          );
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {renderGame()}
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <AuthScreen
            onSubmit={login}
            onReplayButtonClick={resetGame}
          />
        </Route>
        <Route exact path={AppRoute.LOSE}>
          <GameOverScreen
            onReplayButtonClick={resetGame}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.RESULT}
          render={() => {
            return (
              <WinScreen
                questionsCount={questions.length}
                mistakesCount={mistakes}
                onReplayButtonClick={resetGame}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
};


AppComponent.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  maxErrorsCount: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxErrorsCount: getMaxErrorsCount(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);


export {
  AppComponent,
  App,
};
