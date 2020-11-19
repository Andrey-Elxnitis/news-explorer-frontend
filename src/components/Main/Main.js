import React from 'react'
import About from '../About/About.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main(props) {
  return (
    <main className="content">
      <NewsCardList
      articles={props.articles}
      >
      </NewsCardList>
      <About />
    </main>
  )
}

export default Main;