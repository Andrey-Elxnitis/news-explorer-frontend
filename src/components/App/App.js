import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js'
import Footer from '../Footer/Footer.js';
import Background from '../Background/Background.js';

// основной компонент, который
function App() {

  const { pathname } = useLocation();

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="background">
            <Header />
            <SearchForm />
          </div>
          <About />
        </Route>
        <Route path="/saved-news">
          <Header />
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;