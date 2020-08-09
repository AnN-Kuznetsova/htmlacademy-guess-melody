import * as React from "react";


interface Props {
  maxErrorsCount: number;
  onWelcomeButtonClick: () => void;
};


export const Welcome: React.FunctionComponent<Props> = (props: Props) => {
  const {maxErrorsCount, onWelcomeButtonClick} = props;

  const _handleWelcomeButtonClick = (event) => {
    event.preventDefault();
    onWelcomeButtonClick.call(event.target);
  };

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button
        className="welcome__button"
        onClick={_handleWelcomeButtonClick}
      >
        <span className="visually-hidden">Начать игру</span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {maxErrorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};
