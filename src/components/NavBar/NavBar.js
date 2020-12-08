import React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import './NavBar.css'
import exitLogoDark from '../../images/exit-dark.png';
import exitLogoWhite from '../../images/exit-white.png';
import { CurrentUserContext } from '../../context/CurrentUserContex.js';

function NavBar(props) {

  const { pathname } = useLocation();

  const currentUser = React.useContext(CurrentUserContext);

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

  // если пользователь авторизован, то показываем имя пользователя
  const textButton = `
  ${
    props.loggedIn
    ?
    `${currentUser.name}`
    :
    `Авторизоваться`
  }`;

  return (
    <nav className={`navigation ${openMobileMenu}`}>
      <ul className="navigation__links">
        <li className="navigation__links-list">
          <NavLink activeClassName={navigationLinkActive} className={`navigation__link ${navigationLinkDark} ${colorLinkOpenMobile}`} exact to="/">Главная</NavLink>
        </li>
        <li className="navigation__links-list">
          <NavLink activeClassName={navigationLinkActive} className={`${props.loggedIn ? `navigation__link ${navigationLinkDark} ${colorLinkOpenMobile}` : 'navigation__link_disable'}`} to="/saved-news">Сохранённые статьи</NavLink>
        </li>
      </ul>
      <button onClick={props.loggedIn ? props.exitAuth : props.handleEditLoginClick} className={buttonWhite}>
      <p className="navigation__button-text">{textButton}</p>
      {props.loggedIn && <img className="navigation__image-exit" src={exitLogoWhite} alt="Кнопка выхода из личного кабинета"></img>}
      </button>
      <button onClick={props.exitAuth} className={buttonDark}>
        <p className="navigation__button-text">{textButton}</p>
        <img className="navigation__image-exit" src={props.isEditOpenMobile ? exitLogoWhite : exitLogoDark} alt="Кнопка выхода из личного кабинета"></img>
      </button>
    </nav>
  )
}

export default NavBar;