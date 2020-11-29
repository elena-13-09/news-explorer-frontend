import React from 'react';
import './NewsCard.css';
import '../../blocks/block-hidden/block-hidden.css';

function NewsCard({ image, keyword, date, title, text, source, isSavedNews }) {
  return (
    <div className="news-card">
      <img className="news-card__image" src={image} alt={title} />
      <p className={`${isSavedNews ? "news-card__keyword" : "block-hidden"}`}>{keyword}</p>
      <button className={`news-card__button ${isSavedNews ? "news-card__button_delete" : "news-card__button_bookmark"}`} type="button"></button>
      <p className="news-card__tooltip">{isSavedNews ? "Убрать из сохранённых" : "Войдите, чтобы сохранять статьи"}</p>
      <p className="news-card__date">{date}</p>
      <p className="news-card__title">{title}</p>
      <p className="news-card__text">{text}</p>
      <p className="news-card__source">{source}</p>
    </div>
  );
}

export default NewsCard;
