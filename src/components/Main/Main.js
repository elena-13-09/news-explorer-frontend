import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';
import About from '../About/About';
import './Main.css';

function Main() {
  return (
    <main className="content">
      <SearchForm />
      {/*<Preloader />
      <NoResult />*/}
      <SearchResult />
      <About />
    </main>
  );
}

export default Main;
