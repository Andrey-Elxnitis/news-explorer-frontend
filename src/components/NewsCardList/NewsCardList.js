import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList(props) {


  // стейт переменная для отрисовки статей
  const [newsArticles, setNewsArticles] = useState([]);

  React.useEffect(() => {
    props.articles && setNewsArticles(props.articles.slice(0, 3));
  }, [props.articles]);

  // при нажатии на кнопку показать еще, загружаем три статьи
  function addArticle() {
    setNewsArticles(props.articles.slice(0, newsArticles.length + 3));
  }


  // так как статьи мы пока не получаем с сервера, я сделал массив с данными для отрисовки статей
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Результаты поиска</h2>
      <div className="news-card-list__box">
         {
         newsArticles.map((article, key) => (
          <NewsCard
          article={article}
          key={key}
          />
        ))
        }

      </div>
      <button onClick={addArticle} className="news-card-list__button">Показать еще</button>
    </section>
  )
}

export default NewsCardList;