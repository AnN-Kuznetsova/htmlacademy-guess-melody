import PropTypes from "prop-types";
import React from "react";
import {ArtistQuestionsPropType} from "../../types.js";


export const GuessArtistGame = (props) => {
  const {question, onAnswer} = props;
  const {answers, song} = question;

  const handleUserAnswerChange = (answer) => {
    onAnswer(question, answer);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <button className="track__button track__button--play" type="button" />
          <div className="track__status">
            <audio src={song.src} />
          </div>
        </div>
      </div>

      <form className="game__artist">
          {
            answers.map((answer, index) => (
              <div className="artist" key={answer.artist + index}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`answer-${index}`}
                  id={`answer-${index}`}
                  onChange={handleUserAnswerChange.bind(null, answer)}
                />
                <label className="artist__name" htmlFor={`answer-${index}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                  {answer.artist}
                </label>
              </div>
            ))
          }

        </form>
    </section>
  );
};


GuessArtistGame.propTypes = {
  question: ArtistQuestionsPropType.isRequired,
  onAnswer: PropTypes.func.isRequired,
};
