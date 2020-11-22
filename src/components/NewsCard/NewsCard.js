import React from 'react'
import './NewsCard.css';
import { useLocation } from 'react-router-dom';
import notImage from '../../images/no_foto.jpg';

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

  // функция изменения формата даты
  function newDate(date) {

    const dateFormat = new Date(date);

    const monthList = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

    const year = dateFormat.getFullYear();
    const month = dateFormat.getMonth();
    const monthReally = monthList[month];
    const days = dateFormat.getDate();
    const newDate = `${days} ${monthReally}, ${year}`;
    return newDate;
  }

  function buttonClick() {
    props.updateMyArticles(props.article, props.keyword, props.myArticle);
  }

  return (
    <article className="news-card">
      <p className={keyword}>{props.keyword}</p>
      <button onClick={buttonClick} className={button}></button>
      <img className="news-card__image" src={props.image ? props.image : notImage} alt={props.title}></img>
      <a className="news-card__link" href={props.link} target="_blank" rel="noreferrer">
      <p className="news-card__date">{newDate(props.date)}</p>
      <h2 className="news-card__title">{props.title}</h2>
      <p className="news-card__text">{props.text}</p>
      <p className="news-card__source">{props.source}</p>
      </a>
    </article>
  )
}

export default NewsCard;