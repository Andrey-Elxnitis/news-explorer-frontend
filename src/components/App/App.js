import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';

// основной компонент приложения
function App() {

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="background">
            <Header />
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
    </div>
  );
}

export default App;