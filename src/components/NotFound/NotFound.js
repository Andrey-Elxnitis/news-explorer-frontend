import React from 'react';
import './NotFound.css';
import notFoundImage from '../../images/not-found.png';

function NotFound(props) {

  // в зависимости от ошибки подставляем текст
  const subtitleText = `${
    props.searchError
    ?
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    :
    'К сожалению по вашему запросу ничего не найдено.'
  }`;

  // если пришла ошибка, то убираем текст "Ничего не найдено"
  const titleText = `${
    props.searchError
    ?
    ''
    :
    'Ничего не найдено'
  }`;

  // если произошла ошибка, то показываем красный текст
  const notFound = `${
    props.searchError
    ?
    'not-found__subtitle not-found__subtitle-error'
    :
    'not-found__subtitle'
  }`;

  return (
    <section className={`not-found ${props.isOpen ? 'not-found_active' : ''}`}>
      <img className="not-found__image" src={notFoundImage} alt="Картинка неудачного поиска новостей"></img>
      <h3 className="not-found__title">{titleText}</h3>
      <p className={notFound}>{subtitleText}</p>
    </section>
  )
}

export default NotFound;