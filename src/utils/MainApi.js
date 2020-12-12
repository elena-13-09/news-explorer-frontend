import { MAIN_URL } from './utils';

//получить ответ
const response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

// регистрация
export const register = (email, password, name) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then(response);
}

// авторизация
export const authorize = (email, password) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response);
}

// получить данные пользоватяля
export const getUserInfo = (token) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(response);
}

// получить сохраненные статьи
export const getMyArticles = (token) => {
  return fetch(`${MAIN_URL}/articles`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response);
}

// сохранение статьи
export const saveArticle = (article, keyword) => {
  const {
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = article
  return fetch(`${MAIN_URL}/articles`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      keyword: keyword,
      title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage || 'https://unsplash.com/a/img/empty-states/photos.png',
    })
  })
    .then(response);
}

// удаление статьи
export const deleteArticle = (articleId) => {
  return fetch(`${MAIN_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  })
    .then(response);
}
