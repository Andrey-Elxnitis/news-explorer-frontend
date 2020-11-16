import React from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {

  // если форма невалидна, то блокируем кнопку отправки
  const popupButton = `${props.isValid ? 'popup__button' : 'popup__button popup__button_disabled'}`;

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>
      <form className={`popup__container popup__container_type_${props.name}`}>
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className={popupButton}>{props.buttonText}</button>
        <p className="popup__text">или <span className="popup__click" onClick={props.onClickPopup}>{props.clickButtonText}</span></p>
      </form>
    </div>
  )
}

export default PopupWithForm