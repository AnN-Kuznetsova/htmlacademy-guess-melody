import PropTypes from "prop-types";
import React from "react";

import {GenreQuestionItem} from "../genre-question-item/genre-question-item.jsx";
import {GenreQuestionsPropType} from "../../types.js";
import {withActivePlayer} from "../../hocs/with-active-player/with-active-player.jsx";
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

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={handleSubmit}
      >
        {
          question.answers.map((answer, index) => (
            <GenreQuestionItem
              key={`${index}-${answer.src}`}
              answer={answer}
              id={index}
              onChange={onChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[index]}
            />
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
const GuessGenreGameWithPlayer = withActivePlayer(GuessGenreGameWithUserAnswer);


export {
  GuessGenreGame,
  GuessGenreGameWithPlayer,
};
