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
    >
      <fieldset className="popup__inputs">
        <span className="popup__input-title">Email</span>
        <input
        className="popup__input"
        required
        placeholder="Введите почту"
        type="email"
        name="email"
        >
        </input>
        <span className="popup__input-title">Пароль</span>
        <input className="popup__input"
        required
        placeholder="Введите пароль"
        type="password"
        name="password">
        </input>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditLoginPopup;