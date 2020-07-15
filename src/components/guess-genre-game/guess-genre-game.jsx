import PropTypes from "prop-types";
import React from "react";

import {GenreQuestionsPropType} from "../../types.js";
import {withUserAnswer} from "../../hocs/with-user-answer/with-user-answer.jsx";


const GuessGenreGame = (props) => {
  const {
    question,
    renderPlayer,
    userAnswers,
    onAnswer,
    onChange,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswer();
  };

  const handleUserAnswerChange = (event) => {
    const value = event.target.checked;
    const index = event.target.dataset.answerIndex;
    onChange(index, value);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={handleSubmit}
      >
        {
          question.answers.map((answer, index) => (
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
                  onChange={handleUserAnswerChange}
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
};


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
