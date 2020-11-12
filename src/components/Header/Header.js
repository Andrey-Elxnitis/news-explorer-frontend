import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation.js';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

  const { pathname } = useLocation();

  //если пользователь открывает раздел сохраненные карточки, меняем цвет логотипа на черный
  const headerLogoDark = `${pathname === '/saved-news' ? 'header__logo_dark' : ''}`;

  return (
    <header className="header">
      <Link to="/" className={`header__logo ${headerLogoDark}`}>NewsExplorer</Link>
      <Navigation
      handleEditLoginClick={props.handleEditLoginClick}
      >
      </Navigation>
    </header>
  )
}

export default Header;