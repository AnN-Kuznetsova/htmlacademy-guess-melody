import * as React from "react";

import {AnswerGenreType} from "../../types";


interface Props {
  answer: AnswerGenreType,
  id: number;
  onChange: (id: number, value: boolean) => void;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswer: boolean;
};


export const GenreQuestionItem: React.FunctionComponent<Props> = (props: Props) => {
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

