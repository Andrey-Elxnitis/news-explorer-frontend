import {
  KEY_API_NEWS,
  URL_NEWS
} from './constans.js';

// по запросу пользователя находим новости
export function searchNews(keyword) {

  let date = new Date();

  // переводим дату в формат 2020-11-19
  const startDate = date.toISOString().slice(0, 10);

  // ищем от даты начала минус 7 дней назад
  date.setDate(date.getDate() - 7);
  const finishDate = date.toISOString().slice(0, 10);

  return fetch(`${URL_NEWS}q=${keyword}&apiKey=${KEY_API_NEWS}&from=${finishDate}&to=${startDate}&sortBy=publishedAt&pageSize=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    });
}