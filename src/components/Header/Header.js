import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation.js';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

  const { pathname } = useLocation();

  //если пользователь открывает раздел сохраненные карточки, меняем цвет логотипа на черный
  const headerLogoDark = `${pathname === '/saved-news' ? 'header__logo_dark' : ''}`;

  // изминение кнопки открытия/закрытия мобильного меню
  const buttonMobileMenu = `${props.isEditOpenMobile ? 'header__button-mobile_close' : ''}`;

  // добавляем затемнение фона при открытие мобильного меню
  // изминение кнопки открытия/закрытия мобильного меню
  const mobileMenuActive = `${props.isEditOpenMobile ? 'header_mobile' : ''}`;

  return (
    <header className={`header ${mobileMenuActive}`}>
      <Link to="/" className={`header__logo ${headerLogoDark}`}>NewsExplorer</Link>
      <button type="button" onClick={props.toggleMobileMenu} className={`header__button-mobile ${buttonMobileMenu}`}></button>
      <Navigation
      handleEditLoginClick={props.handleEditLoginClick}
      isEditOpenMobile={props.isEditOpenMobile}
      >
      </Navigation>
    </header>
  )
}

export default Header;