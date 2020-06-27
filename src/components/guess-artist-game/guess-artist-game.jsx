import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {ArtistQuestionsPropType} from "../../types.js";
import {AudioPlayer} from "../audio-player/audio-player.jsx";


export class GuessArtistGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true,
    };

    this._handleUserAnswerChange = this._handleUserAnswerChange.bind(this);
    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  _handlePlayButtonClick() {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  }

  _handleUserAnswerChange(answer) {
    const {question, onAnswer} = this.props;

    onAnswer(question, answer);
  }

  render() {
    const {isPlaying} = this.state;
    const {question} = this.props;
    const {answers, song} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              src={song.src}
              isPlaying={isPlaying}
              onPlayButtonClick={this._handlePlayButtonClick}
            />
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
                  onChange={this._handleUserAnswerChange.bind(this, answer)}
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

  }
}


GuessArtistGame.propTypes = {
  question: ArtistQuestionsPropType.isRequired,
  onAnswer: PropTypes.func.isRequired,
};
