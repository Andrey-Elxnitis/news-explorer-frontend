import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import githubLogo from '../../images/github.png';
import facebookLogo from '../../images/facebook.png';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <div className="footer__box">
        <ul className="footer__list">
          <li className="footer__links">
            <Link onClick={props.topScroll} className="footer__link" to="/">Главная</Link>
          </li>
          <li className="footer__links">
            <a className="footer__link footer__link_width" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__social-icons">
          <li>
            <a href="https://github.com/Andrey-Elxnitis" target="_blank" rel="noreferrer"><img className="footer__image-icon" src={githubLogo} alt="логотип GitHub"></img></a>
          </li>
          <li>
            <a href="https://ru-ru.facebook.com/" target="_blank" rel="noreferrer"><img className="footer__image-icon" src={facebookLogo} alt="логотип Facebook"></img></a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;