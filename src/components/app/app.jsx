import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/game/game.js";
// import {AuthorizationStatus} from "../../reducers/user/user.js";
import {AuthScreen} from "../auth-screen/auth-screen.jsx";
import {GameOverScreen} from "../game-over-screen/game-over-screen.jsx";
import {GameScreen} from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import {GuessArtistGameWithPlayer} from "../guess-artist-game/guess-artist-game.jsx";
import {GuessGenreGameWithPlayer} from "../guess-genre-game/guess-genre-game.jsx";
import {Operation as UserOperation} from "../../reducers/user/user.js";
import {Welcome} from "../welcome/welcome.jsx";
import {WinScreen} from "../win-screen/win-screen.jsx";
import {getStep, getMistakes, getMaxErrorsCount} from "../../reducers/game/selectors.js";
import {getQuestions} from "../../reducers/data/selectors.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";


const AppComponent = (props) => {
  const {
    // authorizationStatus,
    // login,
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
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
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
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderGame()}
        </Route>
        {/* <Route exact path="/genre-game">
          <GuessGenreGameWithPlayer
            question={questions[0]}
            onAnswer={onUserAnswer}
          />
        </Route>
        <Route exact path="/artist-game">
          <GuessArtistGameWithPlayer
            question={questions[1]}
            onAnswer={onUserAnswer}
          />
        </Route> */
          <Route exact path="/dev-auth">
            <AuthScreen
              onSubmit={() => {}}
              onReplayButtonClick={() => {}}
            />
          </Route>}
      </Switch>
    </BrowserRouter>
  );
};


AppComponent.propTypes = {
  // authorizationStatus: PropTypes.string.isRequired,
  // login: PropTypes.func.isRequired,
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
