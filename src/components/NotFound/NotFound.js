import React from 'react';
import './NotFound.css';
import notFoundImage from '../../images/not-found.png';

function NotFound(props) {

  // взависимости от ошибки подставляем текст
  const subtitleText = `${
    props.searchError
    ?
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    :
    'К сожалению по вашему запросу ничего не найдено.'
  }`;

  return (
    <section className={`not-found ${props.isOpen ? 'not-found_active' : ''}`}>
      <img className="not-found__image" src={notFoundImage} alt="Картинка неудачного поиска новостей"></img>
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">{subtitleText}</p>
    </section>
  )
}

export default NotFound;