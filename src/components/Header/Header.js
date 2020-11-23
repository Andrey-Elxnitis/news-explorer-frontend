import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation.js';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

  const { pathname } = useLocation();

  // если открываем сохраненные статьи, шапке добавляем box-shadow
  const boxShadow = `${
    pathname === '/saved-news' ? 'header_saved' : ''
  }`;

  // на мобильной версии на вкладке сохраненные статьи делаем залипание шапки
  const headerSticking = `${
    pathname === '/saved-news' ? 'header_mobile_sticking' : ''
  }`;

  // если на вкладке сохранненые статьи открываем мобильное меню, логотип меняем а белый цвет
  const headerLogoColor =
  `${
    props.isEditOpenMobile
    ?
    pathname === '/saved-news' ? 'header__logo_white' : 'header__logo_white'
    :
    pathname === '/saved-news' ? 'header__logo_dark' : 'header__logo_white'
  }`;

  // изменение кнопки открытия/закрытия мобильного меню
  const buttonMobileMenu =
  `${
    props.isEditOpenMobile
    ?
    pathname === '/saved-news' ? 'header__button-mobile_close_white' : 'header__button-mobile_close'
    :
    pathname === '/saved-news' ? 'header__button-mobile_black' : 'header__button-mobile'
  }`;

  // добавляем затемнение фона при открытие мобильного меню
  const mobileMenuActive = `${props.isEditOpenMobile ? 'header_mobile' : ''}`;

  // на разрешение 330px скрываем кнопку в шапке, если открыт попап
  const buttonMobileMenuHidden = `${
    props.isEditLoginPopup || props.isEditRegisterPopup
    ? 'header__button-mobile_hidden' : ''
  }`;

  return (
    <header className={`header ${mobileMenuActive} ${boxShadow} ${headerSticking}`}>
      <Link to="/" className={`header__logo ${headerLogoColor}`}>NewsExplorer</Link>
      <button type="button" onClick={props.toggleMobileMenu} className={`header__button-mobile ${buttonMobileMenu} ${buttonMobileMenuHidden}`}></button>
      <Navigation
      handleEditLoginClick={props.handleEditLoginClick}
      isEditOpenMobile={props.isEditOpenMobile}
      loggedIn={props.loggedIn}
      currentUser={props.currentUser}
      exitAuth={props.exitAuth}
      >
      </Navigation>
    </header>
  )
}

export default Header;

