import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GenreQuestionsPropType} from "../../types.js";


export class GuessGenreGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [false, false, false, false],
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleUserAnswerChange = this._handleUserAnswerChange.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    const {onAnswer, question} = this.props;
    onAnswer(question, this.state.userAnswers);
  }

  _handleUserAnswerChange(event) {
    const value = event.target.checked;
    const index = event.target.dataset.answerIndex;

    this.setState((prevState) => {
      const userAnswers = prevState.userAnswers.slice();
      userAnswers[index] = value;
      return {userAnswers};
    });
  }

  render() {
    const {question, renderPlayer} = this.props;
    const {userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmit}
        >
          {
            answers.map((answer, index) => (
              <div className="track" key={`${index}-${answer.src}`}>
                {renderPlayer(answer.src, index)}

                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    data-answer-index={index}
                    checked={userAnswers[index]}
                    onChange={this._handleUserAnswerChange}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            ))
          }

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}


GuessGenreGame.propTypes = {
  question: GenreQuestionsPropType.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};
