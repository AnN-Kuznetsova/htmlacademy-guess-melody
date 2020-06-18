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
              onAnswer={this._handleAnswer}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {}

  _handleWelcomeButtonClick() {}

  _handleAnswer() {}
}


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
