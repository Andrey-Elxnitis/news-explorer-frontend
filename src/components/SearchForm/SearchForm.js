import React, { useState } from 'react'
import './SearchForm.css';

function SearchForm(props) {

  // стейт переменная отслеживает пустой инпут
  const [keyword, setKeyword] = useState('');

  function submitForm(e) {

    e.preventDefault();
    if (keyword === '') {
      // показываем ошибку
      console.log('нужно ввести слово');
    } else {
      props.handleSearchNews(keyword);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={submitForm} noValidate>
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__about">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <div className="search__box">
        <input
        className="search__input"
        placeholder="Введите тему новости"
        required
        onChange={ e => setKeyword(e.target.value)}
        >
        </input>
        <button className="search__button">Искать</button>
      </div>
    </form>
    </section>
  )
}

export default SearchForm;