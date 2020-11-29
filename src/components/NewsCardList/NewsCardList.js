import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ cards, isSavedNews }) {
  return (
    <section className="news-card-list">
      {cards.map((card, index) => (
        <NewsCard
          key={index}
          keyword={card.keyword}
          title={card.title}
          text={card.text}
          date={card.date}
          source={card.source}
          image={card.image}
          isSavedNews={isSavedNews}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
