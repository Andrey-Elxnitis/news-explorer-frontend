import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList(props) {

  // стейт переменная для отрисовки статей
  const [newsArticles, setNewsArticles] = useState([]);

  // стейт переменная для скрытия кнопки "Показать еще"
  const [activeButton, setActiveButton] = useState(true)

  React.useEffect(() => {
    props.articles && setNewsArticles(props.articles.slice(0, 3));
  }, [props.articles]);

  // при нажатии на кнопку показать еще, загружаем три статьи
  function addArticle() {
    setNewsArticles(props.articles.slice(0, newsArticles.length + 3));

    // скрываем кнопку, если все статьи загрузили
    if (newsArticles.length >= props.articles.length - 3) {
      setActiveButton(false);
    }
  }

  return (
    newsArticles.length > 0
      ?
      <section className="news-card-list">
      <h2 className="news-card-list__title">Результаты поиска</h2>
      <div className="news-card-list__box">
         {
         newsArticles.map((article, key) => (
          <NewsCard
          article={article}
          articlesNews={props.articles}
          saveArticles={props.saveArticles}
          image={article.urlToImage}
          link={article.url}
          date={article.publishedAt}
          title={article.title}
          text={article.description}
          source={article.source.name}
          key={key}
          updateMyArticles={props.updateMyArticles}
          keyword={props.keyword}
          loggedIn={props.loggedIn}
          setActiveFlag={props.setActiveFlag}
          activeFlag={props.activeFlag}
          />
        ))
        }
      </div>
      <button onClick={addArticle} className={`news-card-list__button ${activeButton ? '' : 'news-card-list__button_disabled'}`}>Показать еще</button>
      </section>
      : ''
  )
}

export default NewsCardList;