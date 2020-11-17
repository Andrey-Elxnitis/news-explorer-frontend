import React from 'react'
import About from '../About/About.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main() {
  return (
    <main className="content">
      <NewsCardList />
      <About />
    </main>
  )
}

export default Main;