import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation.js';
import { useLocation } from 'react-router-dom';

function Header() {

  const { pathname } = useLocation();

  //если пользователь открывает раздел сохраненные карточки, меняем цвет логотипа на черный
  const headerLogoDark = `${pathname === '/saved-news' ? 'header__logo_dark' : ''}`;

  return (
    <header className="header">
      <h3 className={`header__logo ${headerLogoDark}`}>NewsExplorer</h3>
      <Navigation></Navigation>
    </header>
  )
}

export default Header;