import React from 'react'
import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

  const { pathname } = useLocation();

  // если вкладка сохраненные статьи, меняем кнопку
  const button = `${
    pathname === '/saved-news' ? 'news-card__button-delete' : 'news-card__button'
  }`;

  // если вкладка сохраненные статьи, отображаем ключевое слово на статье
  const keyword = `${
    pathname === '/saved-news'
    ? 'news-card__keyword news-card__keyword_active' : 'news-card__keyword'
  }`;

  return (
    <article className="news-card">
      <p className={keyword}>{props.article.keyword}</p>
      <button className={button}></button>
      <img className="news-card__image" src={props.article.image} alt={props.article.title}></img>
      <a className="news-card__link" href={props.article.link} target="_blank" rel="noreferrer">
      <p className="news-card__date">{props.article.date}</p>
      <h2 className="news-card__title">{props.article.title}</h2>
      <p className="news-card__text">{props.article.text}</p>
      <p className="news-card__source">{props.article.source}</p>
      </a>
    </article>
  )
}

export default NewsCard;