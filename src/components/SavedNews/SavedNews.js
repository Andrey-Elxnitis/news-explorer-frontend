import React from 'react';
import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';

function SavedNews(props) {

  return (
    <section className="saved-news">
      <SavedNewsHeader
      lengthMyArticles={props.lengthMyArticles}
      >
      </SavedNewsHeader>
      <div className="saved-news__container">
      <article className="news-card-list__box">
      {
         props.myArticles.map((article, key) => (
          <NewsCard
          myArticle={article}
          image={article.image}
          link={article.link}
          date={article.date}
          title={article.title}
          text={article.text}
          source={article.source.name || article.source}
          keyword={article.keyword || props.keyword}
          key={key}
          updateMyArticles={props.updateMyArticles}
          />
        ))
        }
      </article>
      </div>
    </section>
  )
}

export default SavedNews;