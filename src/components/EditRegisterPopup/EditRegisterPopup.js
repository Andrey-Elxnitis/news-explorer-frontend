import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function EditRegisterPopup(props) {
  return (
    <PopupWithForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      isOpen={props.isOpen}
      onClose={props.onClose}
      clickButtonText="Войти"
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
        value={props.values.password || ''}
        onChange={props.handleChange}
        >
        </input>
        <span className="popup__input-error">{props.error.email || ''}</span>
        <span className="popup__input-title">Пароль</span>
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
        <span className="popup__input-title">Имя</span>
        <input className="popup__input"
        required
        placeholder="Введите имя"
        type="text"
        name="name"
        minLength="2"
        maxLength="30"
        value={props.values.name || ''}
        onChange={props.handleChange}
        >
        </input>
        <span className="popup__input-error">{props.error.name || ''}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditRegisterPopup;