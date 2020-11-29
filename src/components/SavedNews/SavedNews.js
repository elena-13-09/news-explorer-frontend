import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import cards from '../../utils/cards';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews() {
  return (
    <section className="saved-news">
      <SavedNewsHeader />
      <NewsCardList cards={cards} isSavedNews={true} />
    </section>
  );
}

export default SavedNews;
