import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import EditLoginPopup from '../EditLoginPopup/EditLoginPopup.js';
import EditRegisterPopup from '../EditRegisterPopup/EditRegisterPopup.js';
import { searchNews } from '../../utils/NewsApi';
import Preloader from '../Preloader/Preloader.js';
import NotFoud from '../NotFound/NotFound.js';

// основной компонент приложения
function App() {

  // стейт переменные для новостных статей
  const [articles, setArticles] = useState([]);


  // стейт переменная для отображения прелоудера
  const [isEditPreloader, setIsEditPreloader] = useState(false);

  // стейт переменная для отображения страницы "Ничего не найдено"
  const [isEditNotFound, setIsEditNotFound] = useState(false);

  // стейт переменные для открытия попапов
  const [isEditLoginPopup, setEditLoginPopup] = useState(false);
  const [isEditRegisterPopup, setEditRegisterPopup] = useState(false);

  // стейт переменные для валидации формы
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({});

  // стейт переменная для открытия мобильного меню
  const [isEditOpenMobile, setEditOpenMobile] = useState(false);


  // функция обрабатывает поиск новостей
  function searchNewsClick(keyword) {

    if (!keyword) {
      // ТУТ НАДО БУДЕТ СДЕЛАТЬ, ЧТОБЫ ОШИБКА ВЫВОДИЛАСЬ
      console.log('нужно ввести слова')
    }

    // показываем прелоадер
    setIsEditPreloader(true)

    searchNews(keyword)
      .then((data) => {

          // записываем статьи в локальное хранилище
          localStorage.setItem('articles', JSON.stringify(data.articles));

          // обновляем стейт
          setArticles(data.articles);

          console.log(articles)
          console.log(data.articles);

        if (data.articles.length === 0) {
          setIsEditNotFound(true)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEditPreloader(false));
  }

  // функция отслеживает ввод данных в инпуты и отображает ошибку, если данные некорректные
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  // функция сбрасывает ошибки при закрытии попапа
  function resetForm() {
    setValues({});
    setIsValid(false);
    setError({});
  }

  // функция открытия мобильного меню
  function toggleMobileMenu() {
    isEditOpenMobile ? setEditOpenMobile(false) : setEditOpenMobile(true);
  }

  // функция открытия попапа входа
  function handleEditLoginClick() {
    setEditLoginPopup(true);
    setEditOpenMobile(false);
  }

  // функция открытия попапа регистрации
  function handleEditRegisterClick() {
    setEditRegisterPopup(true);
  }

  // функция закрытия попапов
  function closeAllPopups() {

    if (isEditLoginPopup) {
      setEditLoginPopup(false);
      resetForm();
    }
    if (isEditRegisterPopup) {
      setEditRegisterPopup(false);
      resetForm();
    }
  }

  // функция отвечает за переключение попапов
  function updatePopup() {

    if (isEditLoginPopup) {
      handleEditRegisterClick();
      closeAllPopups();
    }
    if (isEditRegisterPopup) {
      handleEditLoginClick();
      closeAllPopups();
    }
  }

  // Закрытие попапов при клике на Esc и на overlay
  React.useEffect(() => {

    // закрытие попапа при клике на Esc
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    // закрытие попапа при клике на overlay
    function closeOverlay(event) {
      if (event.target.classList.contains('popup_active')) {
        closeAllPopups();
      }
    }

    // вешаем слушатели
    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', handleEscClose);

    // удаляем слушатели
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeOverlay);
    }
  });

  //функция при нажатии на главную скроллит страницу наверх
function topScroll () {
  if (window.pageYOffset > 0) {
      window.scrollBy(0, -30);
      setTimeout(topScroll, 0);
  }
}

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="background">
            <Header
            handleEditLoginClick={handleEditLoginClick}
            handleEditRegisterClick={handleEditRegisterClick}
            toggleMobileMenu={toggleMobileMenu}
            isEditOpenMobile={isEditOpenMobile}
            isEditLoginPopup={isEditLoginPopup}
            isEditRegisterPopup={isEditRegisterPopup}
            >
            </Header>
            <SearchForm
            handleSearchNews={searchNewsClick}
            >
            </SearchForm>
          </div>
          <Preloader
            isOpen={isEditPreloader}
            >
            </Preloader>
            <NotFoud
            isOpen={isEditNotFound}
            >
            </NotFoud>
          <Main
          articles={articles}
          >
          </Main>
        </Route>
        <Route path="/saved-news">
          <Header
          handleEditLoginClick={handleEditLoginClick}
          handleEditRegisterClick={handleEditRegisterClick}
          toggleMobileMenu={toggleMobileMenu}
          isEditOpenMobile={isEditOpenMobile}
          isEditLoginPopup={isEditLoginPopup}
          isEditRegisterPopup={isEditRegisterPopup}
          >
          </Header>
          <SavedNewsHeader />
          <SavedNews />
        </Route>
      </Switch>
      <Footer
      topScroll={topScroll}
      ></Footer>

      <section className="popups">

        <EditLoginPopup
        isOpen={isEditLoginPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        error={error}
        values={values}
        isValid={isValid}
        handleChange={handleChange}
        >
        </EditLoginPopup>

        <EditRegisterPopup
        isOpen={isEditRegisterPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        error={error}
        values={values}
        isValid={isValid}
        handleChange={handleChange}
        >
        </EditRegisterPopup>
      </section>
    </div>
  );
}

export default App;