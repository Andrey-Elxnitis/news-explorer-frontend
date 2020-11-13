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

// основной компонент приложения
function App() {


  // стейт переменные для открытия попапов
  const [isEditLoginPopup, setEditLoginPopup] = useState(false);
  const [isEditRegisterPopup, setEditRegisterPopup] = useState(false);

  // стейт переменная для открытия мобильного меню
  const [isEditOpenMobile, setEditOpenMobile] = useState(false);

  // функция открытия мобильного меню
  function toggleMobileMenu() {
    console.log('я работаю')
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
    }
    if (isEditRegisterPopup) {
      setEditRegisterPopup(false);
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
            >
            </Header>
            <SearchForm />
          </div>
          <Main />
        </Route>
        <Route path="/saved-news">
          <Header />
          <SavedNewsHeader />
          <SavedNews />
        </Route>
      </Switch>
      <Footer />

      <section className="popups">

        <EditLoginPopup
        isOpen={isEditLoginPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        >
        </EditLoginPopup>

        <EditRegisterPopup
        isOpen={isEditRegisterPopup}
        onClose={closeAllPopups}
        onClickPopup={updatePopup}
        >
        </EditRegisterPopup>

      </section>
    </div>
  );
}

export default App;