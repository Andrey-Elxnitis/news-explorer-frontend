import React from 'react';
import './Preloader.css';

function Preloader(props) {
  return (
    <section className={`preloader ${props.isOpen ? 'preloader_active' : ''}`}>
      <i className="preloader__circle"></i>
      <p className="preloader__title">Идет поиск новостей......</p>
    </section>
  )
}

export default Preloader;