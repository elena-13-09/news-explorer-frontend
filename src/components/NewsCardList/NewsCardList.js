import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  renderArticles,
  findMySevedArticles,
  mySavedArticles,
  onRegister,
  loggedIn,
  keyword }) {

  return (
    <div className="news-card-list">
      {renderArticles.map((article, index) => (
        <NewsCard
          key={index}
          keyword={keyword}
          title={article.title}
          text={article.description}
          date={article.publishedAt}
          source={article.source.name}
          image={article.urlToImage}
          link={article.url}
          article={article}
          findMySevedArticles={findMySevedArticles}
          mySavedArticles={mySavedArticles}
          onRegister={onRegister}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  );
}

export default NewsCardList;
