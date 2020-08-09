import * as React from "react";

import {GenreQuestionItem} from "../genre-question-item/genre-question-item";
import {GenreQuestionType} from "../../types";
import {withActivePlayer} from "../../hocs/with-active-player/with-active-player";
import {withUserAnswer} from "../../hocs/with-user-answer/with-user-answer";


interface Props {
  question: GenreQuestionType;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswers: boolean[];
  onAnswer: () => void;
  onChange: () => void;
}


const GuessGenreGame: React.FunctionComponent<Props> = (props: Props) => {
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


const GuessGenreGameWithUserAnswer = withUserAnswer(GuessGenreGame);
const GuessGenreGameWithPlayer = withActivePlayer(GuessGenreGameWithUserAnswer);


export {
  GuessGenreGame,
  GuessGenreGameWithPlayer,
};
