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
        <Header></Header>
        <Route exact patch="/">
          { /* ЗДЕСЬ БУДЕТ КОМПОНЕНТ MAIN */ }
        </Route>
        <Route path="/saved-news">
          { /* ЗДЕСЬ БУДЕМ ОТОБРАЖАТЬ СОХРАНЕННЫЕ КАРТОЧКИ */ }
        </Route>
        <Footer></Footer>
      </Switch>
    </div>
  );
}

export default App;