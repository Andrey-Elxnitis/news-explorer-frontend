import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__box">
        <p className="saved-news-header__subtitle">Сохраненные статьи</p>
        <h3 className="saved-news-header__title">Грета, у вас 5 сохраненных статей</h3>
        <p className="saved-news-header__keyword">По ключевым словам: <span className="saved-news-header__keyword-dark">Природа, Тайга</span> и <span className="saved-news-header__keyword-dark">2-м другим</span> </p>
      </div>
    </section>
  )
}

export default SavedNewsHeader;