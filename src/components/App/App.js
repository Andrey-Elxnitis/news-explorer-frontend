import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import EditInfoPopup from '../EditInfoPopup/EditInfoPopup.js';
import { searchNews } from '../../utils/NewsApi';
import Preloader from '../Preloader/Preloader.js';
import NotFoud from '../NotFound/NotFound.js';
import { register, authorize, getInfo } from '../../utils/MainApi.js';

// основной компонент приложения
function App() {

  // история для переброски пользователя
  const history = useHistory();

  // стейт переменные для новостных статей
  const [articles, setArticles] = useState([]);
  const [searchError, setSearchError] = useState(false);


  // стейт переменная для отображения прелоудера
  const [isEditPreloader, setIsEditPreloader] = useState(false);

  // стейт переменная для отображения страницы "Ничего не найдено"
  const [isEditNotFound, setIsEditNotFound] = useState(false);

  // стейт переменные для открытия попапов
  const [isEditLoginPopup, setEditLoginPopup] = useState(false);
  const [isEditRegisterPopup, setEditRegisterPopup] = useState(false);
  const [isEditInfoPopup, setIsEditInfoPopup] = useState(false);

  // стейт переменные для валидации формы
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({});

  // стейт переменная для открытия мобильного меню
  const [isEditOpenMobile, setEditOpenMobile] = useState(false);

  // стейт переменная для показа ошибки при регистрации пользователя
  const [textErrorForm, setTextErrorForm] = useState('');

  // состояние пользователя авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);


  // функция проверки токена
  function getToken() {

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setLoggedIn(true)
      history.push('/')

      // НУЖНО БУДЕТ ЗАПРОСИТЬ ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ И СТАТЬИ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
    }
  }

  // проверяем наличие токена в локальном хранилище
  React.useEffect(() => {
    getToken();
  },[]);

  // функция обрабатывает поиск новостей
  function searchNewsClick(keyword) {

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
      .catch((err) => {
        console.log(err.status);
        setSearchError(true);
        setIsEditNotFound(true);
      })
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
    if (isEditInfoPopup) {
      setIsEditInfoPopup(false);
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

  // функция отвечает за регистрацию пользователя
  function registerUser(email, password, name) {
    register(email, password, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setIsEditInfoPopup(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setTextErrorForm(err.message);
        console.log(err);
      });
  }

  // функция отвечает за авторизацию пользователя
  function entranceLogin(email, password) {
    authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);

      if (res) {
        getInfo(res.token)
          .then((data) => {
            // записываем данные пользователя в локальное ранилищех
            localStorage.setItem('user', JSON.stringify(data));

            //нужно будет передать данные пользователя в currentUser

            // авторизуем пользователя
            setLoggedIn(true)
            closeAllPopups();
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => {
      setError(false)
      console.log(err);
    });
  }

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
            searchError={searchError}
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

        <Login
        isOpen={isEditLoginPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        error={error}
        values={values}
        isValid={isValid}
        handleChange={handleChange}
        authorize={entranceLogin}
        >
        </Login>

        <Register
        isOpen={isEditRegisterPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        error={error}
        values={values}
        isValid={isValid}
        handleChange={handleChange}
        textErrorForm={textErrorForm}
        registerUser={registerUser}
        >
        </Register>

        <EditInfoPopup
        isOpen={isEditInfoPopup}
        onClose={closeAllPopups}
        >
        </EditInfoPopup>
      </section>
    </div>
  );
}

export default App;