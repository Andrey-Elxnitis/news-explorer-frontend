import React, { useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import EditInfoPopup from '../EditInfoPopup/EditInfoPopup.js';
import { searchNews } from '../../utils/NewsApi';
import Preloader from '../Preloader/Preloader.js';
import NotFoud from '../NotFound/NotFound.js';
import {
  register,
  authorize,
  getInfo,
  getMyArticles,
  createArticle,
  deleteArticle
} from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../context/CurrentUserContex.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

// основной компонент приложения
function App() {

  // история для переброски пользователя
  const history = useHistory();

  //стейт переменная принимает данные пользователя
  const [currentUser, setCurrenUser] = useState({});

  // стейт переменные для новостных статей
  const [articles, setArticles] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [myArticles, setMyArticles] = useState([]);
  const [lengthMyArticles, setLengthMyArticles] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [activeFlag, setActiveFlag] = useState(false);

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
      setCurrenUser(JSON.parse(localStorage.getItem('user')));
      getMySaveArticles();
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
    setArticles([]);
    setIsEditNotFound(false);
    setSearchError(false);

    searchNews(keyword)
      .then((data) => {

          // записываем статьи в локальное хранилище
          localStorage.setItem('articles', JSON.stringify(data.articles));

          // обновляем стейт
          setArticles(data.articles);
          setKeyword(keyword);

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
            setCurrenUser(data);
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

  // функция отвечает за выход пользователя из приложения
  function exitAuth() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setLoggedIn(false);
    history.push('/');
  }

  //функция при нажатии на главную скроллит страницу наверх
  function topScroll () {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -30);
      setTimeout(topScroll, 0);
    }
  }

  // запрашиваем сохраненные карточки
  function getMySaveArticles() {
    getMyArticles()
      .then((res) => {
        if (res) {
          setMyArticles(res);
          setLengthMyArticles(res.length);
          setKeyword(res.keyword)
        } else {
          setMyArticles([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // сохраняем статью
  function saveArticle(article, keyword) {
    if (loggedIn) {

      console.log(article, keyword);

      createArticle(article, keyword)
        .then((data) => {
          if (data) {
           // setMyArticles([...myArticles, article]);
           getMySaveArticles();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  // удаляем статью
  function deleteMyArticle(article) {
    deleteArticle(article)
      .then((data) => {
        const myArticleArray = myArticles.filter((i) => (i._id !== article._id));
        setMyArticles(myArticleArray);
        setLengthMyArticles(myArticleArray.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // определяем какая статья, и либо ее сохраняем, либо удаляем
  function updateMyArticles(article, keyword, myArticle) {

    const mySavedArticle = myArticles.find((i) => {
      if (myArticle) {
      return i.title === myArticle.title && i.text === myArticle.text;
      }

      if (article) {
        return i.title === article.title && i.text === article.description;
      }

    });

    if (mySavedArticle) {
      deleteMyArticle(mySavedArticle);
    } else {
      saveArticle(article, keyword);
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
            loggedIn={loggedIn}
            currentUser={currentUser}
            exitAuth={exitAuth}
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
          saveArticles={myArticles}
          updateMyArticles={updateMyArticles}
          keyword={keyword}
          loggedIn={loggedIn}
          setActiveFlag={setActiveFlag}
          activeFlag={activeFlag}
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
        loggedIn={loggedIn}
        currentUser={currentUser}
        exitAuth={exitAuth}
        >
        </Header>
        <ProtectedRoute path="/saved-news"
        loggedIn={loggedIn}
        component={SavedNews}
        handleEditRegisterClick={handleEditRegisterClick}
        myArticles={myArticles}
        deleteArticle={deleteMyArticle}
        updateMyArticles={updateMyArticles}
        keyword={keyword}
        lengthMyArticles={lengthMyArticles}
        >
        </ProtectedRoute>
      </Route>
      <Route>
        <Redirect to="/"/>
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;