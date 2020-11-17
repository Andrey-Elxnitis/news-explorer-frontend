import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader">
      <i className="preloader__circle"></i>
      <p className="preloader__title">Идет поиск новостей......</p>
    </section>
  )
}

export default Preloader;