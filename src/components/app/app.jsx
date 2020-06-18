import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {GenreQuestionScreen} from "../genre-question-screen/genre-question-screen.jsx";
import {Welcome} from "../welcome/welcome.jsx";
import {GameType} from "../../const.js";


export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };

    this._handleWelcomeButtonClick = this._handleWelcomeButtonClick.bind(this);
    this._handleAnswer = this._handleAnswer.bind(this);
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreen
              question={questions[0]}
              onAnswer={() => {}} // {this._handleAnswer}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderWelcomeScreen() {
    const {errorsCount} = this.props;

    return (
      <Welcome
        errorsCount={errorsCount}
        onWelcomeButtonClick={this._handleWelcomeButtonClick}
      />
    );
  }

  _renderGameScreen() {
    const {questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return this._renderWelcomeScreen();
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              question={question}
              onAnswer={this._handleAnswer}
            />
          );
        case GameType.ARTIST:
          break;
        default:
          this._renderWelcomeScreen();
      }
    }

    return null;
  }

  _handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  _handleAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }
}


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
