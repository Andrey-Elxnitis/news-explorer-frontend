import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

// основной компонент, который
function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact patch="/">
          <Header />
        </Route>
        <Route path="/saved-news">
          { /* ЗДЕСЬ БУДЕМ ОТОБРАЖАТЬ СОХРАНЕННЫЕ КАРТОЧКИ */ }
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;