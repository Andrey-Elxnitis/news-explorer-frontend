import React, { useEffect } from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../context/CurrentUserContex.js';

function SavedNewsHeader(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function textSaveArticles(number) {

    if (number >= 5 || number === 0)
      return 'сохраненных статей';

    if (number > 1 && number < 5)
      return 'сохраненные статьи';

    if (number === 1)
      return 'сохраненная статья';
  }

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__box">
        <p className="saved-news-header__subtitle">Сохраненные статьи</p>
        <h3 className="saved-news-header__title">{currentUser.name}, у вас {props.lengthMyArticles} {textSaveArticles(props.lengthMyArticles)}</h3>
        <p className="saved-news-header__keyword">По ключевым словам: <span className="saved-news-header__keyword-dark">Природа, Тайга</span> и <span className="saved-news-header__keyword-dark">2-м другим</span> </p>
      </div>
    </section>
  )
}

export default SavedNewsHeader;