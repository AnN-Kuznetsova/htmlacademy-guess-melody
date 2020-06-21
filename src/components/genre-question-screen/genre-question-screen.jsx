import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GenreQuestionsPropType} from "../../types.js";


export class GenreQuestionScreen extends PureComponent {
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
    const {question} = this.props;
    const {userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}
            />
          </svg>

          <div className="game__mistakes">
            <div className="wrong" />
            <div className="wrong" />
            <div className="wrong" />
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={this._handleSubmit}
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
      </section>
    );
  }
}


GenreQuestionScreen.propTypes = {
  question: GenreQuestionsPropType.isRequired,
  onAnswer: PropTypes.func.isRequired,
};
