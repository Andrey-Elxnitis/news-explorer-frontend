import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './Login.css';

function Login(props) {

  // функция отправки данных для регистрации пользователя
  function submitAuthorize(e) {
    e.preventDefault();
    props.authorize(props.values.email, props.values.password);
  }

  return (
    <PopupWithForm
      name="login"
      title="Вход"
      buttonText={props.isLoading ? 'Загрузка' : 'Войти'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      clickButtonText="Зарегистрироваться"
      onClickPopup={props.onClickPopup}
      isValid={props.isValid}
      onsubmit={submitAuthorize}
    >
      <fieldset className="popup__inputs">
        <span className="popup__input-title">Email</span>
        <input
        autoComplete="on"
        className="popup__input"
        required
        placeholder="Введите почту"
        type="email"
        name="email"
        minLength="2"
        maxLength="60"
        value={props.values.email || ''}
        onChange={props.handleChange}
        >
        </input>
        <span className="popup__input-error">{props.error.email || ''}</span>
        <span className="popup__input-title popup__input-title_margin">Пароль</span>
        <input
        autoComplete="on"
        className="popup__input"
        required
        placeholder="Введите пароль"
        type="password"
        name="password"
        minLength="10"
        maxLength="60"
        value={props.values.password || ''}
        onChange={props.handleChange}
        >
        </input>
        <span className="popup__input-error">{props.error.password || ''}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default Login;