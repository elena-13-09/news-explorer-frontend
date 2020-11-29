import React from 'react';
import './SearchForm.css'

function SearchForm() {
  return (
    <form className="search-form">
      <h1 className="search-form__title">Что творится в<br /> мире?</h1>
      <p className="search-form__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <fieldset className="search-form__field">
        <input className="search-form__input" type="text" placeholder="Введите тему новости" required></input>
        <button className="search-form__button" type="submit">Искать</button>
      </fieldset>
    </form>
  );
}

export default SearchForm;
