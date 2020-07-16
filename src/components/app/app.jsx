import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducers/reducer.js";
import {GameOverScreen} from "../game-over-screen/game-over-screen.jsx";
import {GameScreen} from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import {GuessArtistGame} from "../guess-artist-game/guess-artist-game.jsx";
import {GuessGenreGameWithUserAnswer} from "../guess-genre-game/guess-genre-game.jsx";
import {Welcome} from "../welcome/welcome.jsx";
import {WinScreen} from "../win-screen/win-screen.jsx";
import {withActivePlayer} from "../../hocs/with-active-player/with-active-player.jsx";


const GuessArtistGameWithPlayer = withActivePlayer(GuessArtistGame);
const GuessGenreGameWithPlayer = withActivePlayer(GuessGenreGameWithUserAnswer);


class AppComponent extends PureComponent {
  renderGame() {
    const {
      maxErrorsCount,
      mistakes,
      questions,
      step,
      onWelcomeButtonClick,
      onUserAnswer,
      resetGame,
    } = this.props;
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
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GuessGenreGameWithPlayer
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        default:
          return null;
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderGame()}
          </Route>
          <Route exact path="/genre-game">
            <GuessGenreGameWithPlayer
              question={questions[0]}
              onAnswer={this._handleAnswer}
            />
          </Route>
          <Route exact path="/artist-game">
            <GuessArtistGameWithPlayer
              question={questions[1]}
              onAnswer={this._handleAnswer}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


AppComponent.propTypes = {
  maxErrorsCount: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  step: state.step,
  maxErrorsCount: state.maxErrorsCount,
  questions: state.questions,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
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
