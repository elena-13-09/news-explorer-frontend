import { NEWS_URL, NEWS_KEY } from './utils';

let date = new Date();

const toDate = date.toISOString().slice(0, 10);
// за 7 дней до сегодняшнего дня
date.setDate(date.getDate() - 7);
const fromDate = date.toISOString().slice(0, 10);

export const getNewsArticle = (keyword) => {
  return fetch(`${NEWS_URL}q=${keyword}&apiKey=${NEWS_KEY}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&pageSize=100`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    });
}
