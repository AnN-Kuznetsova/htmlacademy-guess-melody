import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GameScreen} from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import {GuessArtistGame} from "../guess-artist-game/guess-artist-game.jsx";
import {GuessGenreGame} from "../guess-genre-game/guess-genre-game.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Welcome} from "../welcome/welcome.jsx";
import {withAudioPlayer} from "../../hocs/with-audio-player/with-audio-player.jsx";


const GuessArtistGameWithPlayer = withAudioPlayer(GuessArtistGame);
const GuessGenreGameWithPlayer = withAudioPlayer(GuessGenreGame);


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };

    this.handleWelcomeButtonClick = this.handleWelcomeButtonClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  handleAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  renderGame() {
    const {questions, maxErrorsCount} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <Welcome
          maxErrorsCount={maxErrorsCount}
          onWelcomeButtonClick={this.handleWelcomeButtonClick}
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
                onAnswer={this.handleAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GuessGenreGameWithPlayer
                question={question}
                onAnswer={this.handleAnswer}
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
              onAnswer={this.handleAnswer}
            />
          </Route>
          <Route exact path="/artist-game">
            <GuessArtistGameWithPlayer
              question={questions[1]}
              onAnswer={this.handleAnswer}
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
};
