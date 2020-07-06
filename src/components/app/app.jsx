import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {ActionCreator} from "../../reducers/reducer.js";
import {GameScreen} from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import {GuessArtistGame} from "../guess-artist-game/guess-artist-game.jsx";
import {GuessGenreGame} from "../guess-genre-game/guess-genre-game.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Welcome} from "../welcome/welcome.jsx";
import {connect} from "react-redux";
import {withAudioPlayer} from "../../hocs/with-audio-player/with-audio-player.jsx";


const GuessArtistGameWithPlayer = withAudioPlayer(GuessArtistGame);
const GuessGenreGameWithPlayer = withAudioPlayer(GuessGenreGame);


class App extends PureComponent {
  _renderGame() {
    const {
      maxErrorsCount,
      questions,
      step,
      onWelcomeButtonClick,
      onUserAnswer,
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <Welcome
          maxErrorsCount={maxErrorsCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
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
            {this._renderGame()}
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


App.propTypes = {
  maxErrorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {
  App,
  ConnectedApp,
};
