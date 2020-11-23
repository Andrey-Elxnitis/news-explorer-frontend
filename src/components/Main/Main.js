import React from 'react'
import About from '../About/About.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main(props) {
  return (
    <main className="content">
      <NewsCardList
      articles={props.articles}
      saveArticles={props.saveArticles}
      updateMyArticles={props.updateMyArticles}
      keyword={props.keyword}
      loggedIn={props.loggedIn}
      setActiveFlag={props.setActiveFlag}
      activeFlag={props.activeFlag}
      >
      </NewsCardList>
      <About />
    </main>
  )
}

export default Main;