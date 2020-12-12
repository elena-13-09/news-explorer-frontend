import React from 'react';
import './NewsCard.css';
import '../../blocks/block-hidden/block-hidden.css';

function NewsCard({
  link,
  image,
  keyword,
  date,
  title,
  text,
  source,
  isSavedNews,
  article,
  findMySevedArticles,
  onRegister,
  loggedIn,
  myArticle,
  mySavedArticles }) {

  // изменение формата даты
  function newDate() {

    const formatDate = new Date();

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

    const day = formatDate.getDate();
    const month = formatDate.getMonth();
    const year = formatDate.getFullYear();
    const monthReal = months[month];
    const newDate = `${day} ${monthReal}, ${year}`;
    return newDate;
  }

  function handleBookmarkClick() {
    findMySevedArticles(article, keyword, myArticle);
  }
  const isBookmarkActive = mySavedArticles.some((i) => i.title === title);

  return (
    <article className="news-card">
      <img className="news-card__image" src={image} alt={title} />
      <p className={`${isSavedNews ? "news-card__keyword" : "block-hidden"}`}>{keyword}</p>
      {loggedIn ?
        (
          <>
            <button
              className={`news-card__button
              ${isSavedNews ? "news-card__button_delete" : loggedIn && isBookmarkActive ? "news-card__button_bookmark-saved" : "news-card__button_bookmark"}`}
              type="button"
              onClick={handleBookmarkClick}>
            </button>
            <p className="news-card__tooltip">{isBookmarkActive || isSavedNews ? "Убрать из сохранённых" : "Сохранить статью"}</p>
          </>
        )
        :
        (
          <>
            <button className="news-card__button news-card__button_bookmark" onClick={onRegister}></button>
            <p className="news-card__tooltip">Войдите, чтобы сохранять статьи</p>
          </>
        )}
      <a className="news-card__link" href={link} target="_blank" rel="noreferrer">
        <p className="news-card__date">{newDate(date)}</p>
        <p className="news-card__title">{title}</p>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </a>
    </article>
  );
}

export default NewsCard;
