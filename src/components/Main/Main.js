import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';
import './Main.css';

function Main({
  onSearchNews,
  articles,
  isPreloader,
  isNoResult,
  isErrorServer,
  findMySevedArticles,
  mySavedArticles,
  loggedIn,
  keyword,
  onRegister }) {

  return (
    <main className="content">
      <SearchForm onSearchNews={onSearchNews} />
      <Preloader isPreloader={isPreloader} />
      <NoResult
        isNoResult={isNoResult}
        isErrorServer={isErrorServer}
      />
      <SearchResult
        articles={articles}
        findMySevedArticles={findMySevedArticles}
        mySavedArticles={mySavedArticles}
        loggedIn={loggedIn}
        onRegister={onRegister}
        keyword={keyword}
      />
      <About />
    </main>
  );
}

export default Main;
