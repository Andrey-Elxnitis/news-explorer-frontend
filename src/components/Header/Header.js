import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation.js';

function Header() {
  return (
    <header className="header">
      <h3 className="header__logo">NewsExplorer</h3>
      <Navigation></Navigation>
    </header>
  )
}

export default Header;