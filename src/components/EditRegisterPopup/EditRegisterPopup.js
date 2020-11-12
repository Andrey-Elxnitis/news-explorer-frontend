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
        <span className="popup__input-title">Имя</span>
        <input className="popup__input"
        required
        placeholder="Введите имя"
        type="text"
        name="name">
        </input>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditRegisterPopup;