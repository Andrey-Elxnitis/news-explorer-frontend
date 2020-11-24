import React, { useState } from 'react'
import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

  const {
    saveArticles,
    loggedIn,
  } = props;

  const { pathname } = useLocation();

  // стейт переменная для закрашивания иконки в синий цвет
  const [activeFlag, setActiveFlag] = useState(false);

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

  // удаляем или сохоаняем статью
  function buttonClick() {
    props.updateMyArticles(props.article, props.keyword, props.myArticle);
  }

  // при сохранении статьи красим иконку в синий цвет
  React.useEffect(() => {

    if(loggedIn === true) {

    if (saveArticles) {
      setActiveFlag(
        saveArticles.find((i) => i.title === props.title) !== undefined
      );
    }
  }
  }, [saveArticles, props.title, activeFlag, loggedIn])

  const button = `${ pathname === '/saved-news' ? 'news-card__button-delete' : `${loggedIn && activeFlag ? 'news-card__button news-card__button_saved' : 'news-card__button'}`}`;

  return (
    <article className="news-card">
      <p className={keyword}>{props.keyword}</p>
      {
        loggedIn ?
        (
          <button onClick={buttonClick} className={button}></button>
        )
        :
        (
          <button onClick={props.handleEditRegisterClick} className="news-card__button news-card__button_disabled"></button>
        )
      }
      <img className="news-card__image" src={props.image ? props.image : "https://dom-dekor.ru/images/not-photo.png.webp"} alt={props.title}></img>
      <a className="news-card__link" href={props.link} target="_blank" rel="noreferrer">
      <p className="news-card__date">{newDate(props.date)}</p>
      <h2 className="news-card__title">{props.title}</h2>
      <p className="news-card__text">{props.text || 'К сожалению нет текста.'}</p>
      <p className="news-card__source">{props.source || props.source.name}</p>
      </a>
    </article>
  )
}

export default NewsCard;