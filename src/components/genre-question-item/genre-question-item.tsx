import PropTypes from "prop-types";
import React from "react";


export const GenreQuestionItem = (props) => {
  const {
    answer,
    id,
    onChange,
    renderPlayer,
    userAnswer,
  } = props;

  const handleUserAnswerChange = (event) => {
    const value = event.target.checked;
    const index = event.target.dataset.answerIndex;
    onChange(index, value);
  };

  return (
    <div className="track" key={`${id}-${answer.src}`}>
      {renderPlayer(answer.src, id)}

      <div className="game__answer">
        <input
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={`answer-${id}`}
          id={`answer-${id}`}
          data-answer-index={id}
          checked={userAnswer}
          onChange={handleUserAnswerChange}
        />
        <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
      </div>
    </div>
  );
};


GenreQuestionItem.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
};
