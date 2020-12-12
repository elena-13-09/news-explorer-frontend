import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResult.css';
import '../../blocks/block-hidden/block-hidden.css';

function SearchResult({
  articles,
  onRegister,
  loggedIn,
  findMySevedArticles,
  keyword,
  mySavedArticles }) {

  const [renderArticles, setRenderArticles] = React.useState([]);
  const [isShowMoreButton, setShowMoreButton] = React.useState(true)

  // отображаются 3 статьи
  React.useEffect(() => {
    setRenderArticles(articles.slice(0, 3));
    if (articles.length === 3) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }
  }, [articles]);

  // показать еще 3 статьи
  function handleShowArticles() {
    setRenderArticles(articles.slice(0, renderArticles.length + 3));
    if (renderArticles.length >= articles.length - 3) {
      setShowMoreButton(false);
    }
  }
  return (
    <section className={`${renderArticles.length > 0 ? "search-result" : "block-hidden"}`}>
      <h2 className="search-result__title">Результаты поиска</h2>
      <NewsCardList
        renderArticles={renderArticles}
        isSavedNews={false}
        onRegister={onRegister}
        loggedIn={loggedIn}
        keyword={keyword}
        mySavedArticles={mySavedArticles}
        findMySevedArticles={findMySevedArticles}
      />
      <button className={`${isShowMoreButton ? "search-result__button" : "block-hidden"}`} onClick={handleShowArticles}>Показать ещё</button>
    </section>
  );
}

export default SearchResult;
