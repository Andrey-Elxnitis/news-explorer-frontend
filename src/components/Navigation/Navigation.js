import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css'

function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link className="navigation__link" to="/">Главная</Link>
        </li>
        <li>
          <Link className="" to="/saved-news">Сохраненные статьи</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;