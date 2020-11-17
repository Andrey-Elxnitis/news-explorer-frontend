import React from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom';
import './Navigation.css'
import exitLogoDark from '../../images/exit-dark.png';
import exitLogoWhite from '../../images/exit-white.png';

function Navigation(props) {

  const { pathname } = useLocation();

  // если пользователь открывает сохраненные карточки, то показываем черную кнопку
  const buttonDark = `${
    pathname === '/saved-news' ? 'navigation__button-dark' : 'navigation__button_hidden'
  }`;

  // если пользователь открывает сохраненные карточки, убираем белую кнопку
  const buttonWhite = `${
    pathname === '/' ? 'navigation__button' : 'navigation__button_hidden'
  }`;

  // если пользователь открывает раздел сохраненные карточки, цвет ссылок меняем на черный
  const navigationLinkDark = `${
    pathname === '/saved-news' ? 'navigation__link_dark' : 'navigation__link_white'
  }`;

  // открытие/закрытие мобильного меню
  const openMobileMenu = `${props.isEditOpenMobile ? 'navigation_mobile' : ''}`;

  // если открывает мобильное меню на вкладке сохраненные сатьи, то ссылки меняем на белый цвет
  const colorLinkOpenMobile = `${props.isEditOpenMobile ? 'navigation__link_white' : ''}`;

  // взависимости, от того, какая вкаладка открыта, делаем ссылку активной (белое и черное подчеркивание)
  const navigationLinkActive =
  `${
    (props.isEditOpenMobile === false)
    ?
    pathname === '/saved-news' ? 'navigation__link_active_dark' : 'navigation__link_active' : ''
  }`;

  return (
    <nav className={`navigation ${openMobileMenu}`}>
      <ul className="navigation__links">
        <li className="navigation__links-list">
          <NavLink activeClassName={navigationLinkActive} className={`navigation__link ${navigationLinkDark} ${colorLinkOpenMobile}`} exact to="/">Главная</NavLink>
        </li>
        <li className="navigation__links-list">
          <NavLink activeClassName={navigationLinkActive} className={`navigation__link ${navigationLinkDark} ${colorLinkOpenMobile}`} to="/saved-news">Сохраненные статьи</NavLink>
        </li>
      </ul>
      <button onClick={props.handleEditLoginClick} className={buttonWhite}>Авторизоваться</button>
      <button className={buttonDark}>Грета
        <img className="navigation__image-exit" src={props.isEditOpenMobile ? exitLogoWhite : exitLogoDark} alt="Кнопка выхода из личного кабинета"></img>
        <Link className="navigation__link-dark" to="/"></Link>
      </button>
    </nav>
  )
}

export default Navigation;