import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './EditLoginPopup.css';

function EditLoginPopup(props) {
  return (
    <PopupWithForm
      name="login"
      title="Вход"
      buttonText="Войти"
      isOpen={props.isOpen}
      onClose={props.onClose}
      clickButtonText="Зарегистрироваться"
      onClickPopup={props.onClickPopup}
      isValid={props.isValid}
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
        minLength="8"
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

export default EditLoginPopup;