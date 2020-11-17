import React from 'react';
import './NotFound.css';
import notFoundImage from '../../images/not-found.png';

function NotFound() {
  return (
    <section className="not-found">
      <img className="not-found__image" src={notFoundImage} alt="Картинка неудачного поиска новостей"></img>
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">К сожалению по вашему запросу ничего&nbsp;не найдено.</p>
    </section>
  )
}

export default NotFound;