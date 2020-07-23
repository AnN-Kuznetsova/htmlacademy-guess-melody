import PropTypes from "prop-types";
import React from "react";

import {ArtistQuestionsPropType} from "../../types.js";
import {withActivePlayer} from "../../hocs/with-active-player/with-active-player.jsx";


const GuessArtistGame = (props) => {
  const {question, onAnswer, renderPlayer} = props;
  const {answers, song} = question;

  const _handleUserAnswerChange = (answer) => {
    onAnswer(question, answer);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
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
                onChange={_handleUserAnswerChange.bind(null, answer)}
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
  renderPlayer: PropTypes.func.isRequired,
};


const GuessArtistGameWithPlayer = withActivePlayer(GuessArtistGame);


export {
  GuessArtistGame,
  GuessArtistGameWithPlayer,
};
