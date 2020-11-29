import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import cards from '../../utils/cards';
import './SearchResult.css';

function SearchResult() {
  return (
    <section className="search-result">
      <h2 className="search-result__title">Результаты поиска</h2>
      <NewsCardList cards={cards} isSavedNews={false} />
      <button className="search-result__button">Показать ещё</button>
    </section>
  );
}

export default SearchResult;
