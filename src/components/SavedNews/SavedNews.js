import React from 'react';
import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard.js';
import savedNews from '../../data/savedNews.js';

function SavedNews(props) {
  return (
    <section className="saved-news">
      <article className="news-card-list__box">
      {
          savedNews.map((article, key) => (
            <NewsCard article={article} key={key} />
          ))
        }
      </article>
    </section>
  )
}

export default SavedNews;