import React from 'react';
import './SearchForm.css'

function SearchForm({ onSearchNews }) {
  const [inputValue, setInputValue] = React.useState('');
  const [inputError, setInputError] = React.useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      setInputError("Нужно ввести ключевое слово");
    } else {
      onSearchNews(inputValue);
    }
  }

  function handleFocus() {
    setInputError('');
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <h1 className="search-form__title">Что творится в<br /> мире?</h1>
      <p className="search-form__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <fieldset className="search-form__field">
        <input className={`search-form__input ${inputError && "search-form__input-error"}`} type="text" placeholder="Введите тему новости" required
          onChange={handleChange}
          value={inputValue || inputError}
          onFocus={handleFocus}
        ></input>
        <button className="search-form__button" type="submit">Искать</button>
      </fieldset>
    </form>
  );
}

export default SearchForm;
