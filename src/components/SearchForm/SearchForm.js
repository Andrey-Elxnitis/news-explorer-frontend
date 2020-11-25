import React, { useState } from 'react'
import './SearchForm.css';

function SearchForm(props) {

  // стейт переменная отслеживает пустой инпут
  const [keyword, setKeyword] = useState('');

  // стейт переменная для отображения ошибки ввода
  const[inputError, setInputError] = useState(false)

  function submitForm(e) {

    e.preventDefault();
    if (keyword === '') {
      // показываем ошибку
      setInputError(true);
    }
    else if (keyword !== '') {
      setInputError(false)
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
        <span className={`search__input-error ${inputError ? 'search__input-error_active' : ''}`}>Введите ключевое слово</span>
        <button className="search__button">Искать</button>
      </div>
    </form>
    </section>
  )
}

export default SearchForm;