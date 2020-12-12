import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews({
  findMySevedArticles,
  loggedIn,
  mySavedArticles, }) {

  return (
    <section className="saved-news">
      <SavedNewsHeader
        mySavedArticles={mySavedArticles}
      />
      <div className="news-card-list">
        {mySavedArticles.map((article, index) => (
          <NewsCard
            key={index}
            keyword={article.keyword}
            title={article.title}
            text={article.text}
            date={article.date}
            source={article.source}
            image={article.image}
            link={article.link}
            myArticle={article}
            findMySevedArticles={findMySevedArticles}
            mySavedArticles={mySavedArticles}
            loggedIn={loggedIn}
            isSavedNews={true}
          />
        ))}

      </div>
    </section>
  );
}

export default SavedNews;
