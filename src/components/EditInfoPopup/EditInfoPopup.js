import React from 'react';
import './EditInfoPopup.css';


// Подумать над кнопкой закрытия попапа на мобильной версии

function EditInfoPopup(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
        <h3 className="popup__title-info">Пользователь успешно зарегистрирован!</h3>
        <button type="button" className="popup__button-info">Войти</button>
      </div>
    </div>
  )
}

export default EditInfoPopup;