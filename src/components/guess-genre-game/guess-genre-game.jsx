import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GenreQuestionsPropType} from "../../types.js";


export class GuessGenreGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [false, false, false, false],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserAnswerChange = this.handleUserAnswerChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {onAnswer, question} = this.props;
    onAnswer(question, this.state.userAnswers);
  }

  handleUserAnswerChange(event) {
    const value = event.target.checked;
    const index = event.target.dataset.answerIndex;

    this.setState((prevState) => {
      const userAnswers = prevState.userAnswers.slice();
      userAnswers[index] = value;
      return {userAnswers};
    });
  }

  render() {
    const {question} = this.props;
    const {userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this.handleSubmit}
        >
          {
            answers.map((answer, index) => (
              <div className="track" key={`${index}-${answer.src}`}>
                <button className="track__button track__button--play" type="button" />
                <div className="track__status">
                  <audio src={answer.src} />
                </div>
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    data-answer-index={index}
                    checked={userAnswers[index]}
                    onChange={this.handleUserAnswerChange}
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
};
