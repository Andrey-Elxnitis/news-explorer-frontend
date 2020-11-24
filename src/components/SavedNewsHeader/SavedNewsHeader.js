import React, { useState } from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../context/CurrentUserContex.js';

function SavedNewsHeader(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // стейт переменная для ключевых слов
  const [kewords, setKeywords] = useState([]);

  // подставляем текст, в зависимости от длинны массива
  function textSaveArticles(number) {

    if (number >= 5 || number === 0)
      return 'сохраненных статей';

    if (number > 1 && number < 5)
      return 'сохраненные статьи';

    if (number === 1)
      return 'сохраненная статья';
  }


  // наполняем массив с ключевыми словами
  React.useEffect(() => {
    const keywordArr = props.myArticles.map(i => i = i.keyword)
      .reduce((first, present) => {
        first[present] = (first[present] || 0) + 1;
        return first;
      }, {});

      const kewordsSort = Object.keys(keywordArr).sort((a, b) => keywordArr[b] - keywordArr[a]);
      setKeywords(kewordsSort);
  }, [props.myArticles]);

  // подставляем текст в зависимости от количества ключевых слов
  function textKeyword(number) {
    let textKeywords = '-и другим';
    if (number.toString().endsWith('1') && !number.toString().endsWith('11')) {
      textKeywords = '-му другому';
    } else if (number.toString().endsWith('2') && !number.toString().endsWith('12')) {
      textKeywords = '-м другим';
    } else if (number.toString().endsWith('3') && !number.toString().endsWith('13')) {
      textKeywords = '-м другим';
    } else if (number.toString().endsWith('4') && !number.toString().endsWith('14')) {
      textKeywords = '-м другим';
    }
    return textKeywords;
}
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__box">
        <p className="saved-news-header__subtitle">Сохраненные статьи</p>
        <h3 className="saved-news-header__title">{currentUser.name}, у вас {props.lengthMyArticles} {textSaveArticles(props.lengthMyArticles)}</h3>
        {
          kewords.length <= 3
          ?
          <p className="saved-news-header__keyword">По ключевым словам:&ensp;
          {
            kewords.map((keyword, i) => {
              return i < kewords.length - 1
                ?
                <span className="saved-news-header__keyword-dark" key={i}>{keyword},&ensp;</span>
                :
                <span className="saved-news-header__keyword-dark" key={i}>{keyword}</span>
            })
          }
          </p>
          :
          <p className="saved-news-header__keyword">По ключевым словам:&ensp;
          {
            kewords.map((keyword, i) => {
              if (i === 0) {
                return <span className="saved-news-header__keyword-dark" key={i}>{keyword},&ensp;</span>
              } else if (i === 1) {
                return <span className="saved-news-header__keyword-dark" key={i}>{keyword}</span>
              }
            })
          } и <span className="saved-news-header__keyword-dark">{kewords.length - 2}{textKeyword(kewords.length - 2)}</span>
          </p>
        }
      </div>
    </section>
  )
}

export default SavedNewsHeader;