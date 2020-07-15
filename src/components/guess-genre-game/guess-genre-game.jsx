import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {GenreQuestionsPropType} from "../../types.js";
import {withUserAnswer} from "../../hocs/with-user-answer/with-user-answer.jsx";


class GuessGenreGame extends PureComponent {
  handleSubmit(event) {
    event.preventDefault();

    const {onAnswer} = this.props;
    onAnswer();
  }

  handleUserAnswerChange(event) {
    const {onChange} = this.props;
    const value = event.target.checked;
    const index = event.target.dataset.answerIndex;

    onChange(index, value);
  }

  render() {
    const {
      question,
      renderPlayer,
      userAnswers,
    } = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this.handleSubmit.bind(this)}
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
                    onChange={this.handleUserAnswerChange.bind(this)}
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
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};


const GuessGenreGameWithUserAnswer = withUserAnswer(GuessGenreGame);


export {
  GuessGenreGame,
  GuessGenreGameWithUserAnswer,
};
