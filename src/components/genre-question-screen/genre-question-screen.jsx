import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GameType} from "../../const.js";


export class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [false, false, false, false],
    };
  }

  render() {
    const {onAnswer, question} = this.props;
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
              style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(event) => {
              event.preventDefault();
              onAnswer(question, this.state.userAnswers);
            }}
          >
            {
              answers.map((answer, index) => (
                <div className="track" key={`${index}-${answer.src}`}>
                  <button className="track__button track__button--play" type="button"></button>
                  <div className="track__status">
                    <audio src={answer.src}></audio>
                  </div>
                  <div className="game__answer">
                    <input
                      className="game__input visually-hidden"
                      type="checkbox"
                      name="answer"
                      value={`answer-${index}`}
                      id={`answer-${index}`}
                      checked={userAnswers[index]}
                      onChange={(event) => {
                        const value = event.target.checked;

                        this.setState({
                          userAnswers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)],
                        });
                      }}
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
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(GameType)).isRequired,
  }).isRequired,
};