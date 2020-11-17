import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import cardResult from '../../data/cardResult';

function NewsCardList() {

  // так как статьи мы пока не получаем с сервера, я сделал массив с данными для отрисовки статей
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Результаты поиска</h2>
      <div className="news-card-list__box">
        {
          cardResult.map((article, key) => (
            <NewsCard article={article} key={key} />
          ))
        }
      </div>
      <button className="news-card-list__button">Показать еще</button>
    </section>
  )
}

export default NewsCardList;