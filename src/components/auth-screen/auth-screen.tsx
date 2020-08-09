import * as React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";


interface Props {
  onSubmit: ({login, password}: {login: string, password: string}) => void,
  onReplayButtonClick: () => void,
};


export const AuthScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onSubmit,
    onReplayButtonClick,
  } = props;

  const loginRef: React.RefObject<HTMLInputElement> = React.createRef();
  const passwordRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
      <form
        className="login__form"
        action=""
        onSubmit={handleSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name"
            ref={loginRef}
          />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password"
            ref={passwordRef}
          />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <Link
        className="replay"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >Сыграть ещё раз</Link>
    </section>
  );
};
