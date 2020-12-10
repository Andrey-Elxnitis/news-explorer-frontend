import { URL_API } from './constans.js';

// функция отвечает за отправку запроса на регистрацию пользователя
export const register = (email, password, name) => {
  return fetch(`${URL_API}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
  })
    .then((res) => {
      if (res.status === 409) {
        return Promise.reject('Пользователь с таким email уже зарегистрирован');
      }
      if (!res.ok) {
        return Promise.reject(`Вам отказано в регистрации, произошла ошибка: ${res.status}`);
      } else if (res.ok) {
        return res.json();
      }
    })
};

// функция отвечает за авторизацию пользователя
export const authorize = (email, password) => {
  return fetch(`${URL_API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  })
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      if (res.status === 401) {
        throw new Error('Неправильные email или password');
      }
      else {
          return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
  })
  .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
  })
};

// при загрузке сайта запрашиваем данные пользователя
export const getInfo = (token) => {
  return fetch(`${URL_API}/users/me`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
        return Promise.reject(`Ошибка: ${err.status}`);
    });
  };

// запрашиваем сохраненные статьи
export function getMyArticles() {
  return fetch(`${URL_API}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then((res) => {
      return res.json();
    })
}

// сохраняем статью в бд
export function createArticle(article, keyword) {
  const {
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = article

  return fetch(`${URL_API}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      keyword: keyword,
      title,
      text: `${description.toString() === "" ? 'К сожалению нет текста' : description}`,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage || 'http://gps-avto.su/userfiles/shop/lgidr/492_gidrozamedlitel-zg10-18.jpg'
    })
  })
    .then((res) => {
      return res.json();
    })
}

export function deleteArticle(article) {
  return fetch(`${URL_API}/articles/${article._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  })
}