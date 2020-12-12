import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';
import '../../blocks/block-hidden/block-hidden.css';

function SavedNewsHeader({ mySavedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  // массив ключевых слов
  const myArraySavedArticles = mySavedArticles.map(i => i = i.keyword);
  const keywordsArray = [...new Set(myArraySavedArticles)];

  // изменение текста в зависимости от количества стататей
  function textArticles(number) {
    if (number >= 5 || number === 0) {
      return "сохраненных статей";
    } else if (number > 1 && number < 5) {
      return "сохраненные статьи";
    } else if (number === 1) {
      return "сохраненная статья";
    }
  }

  function textKeywords(number) {
    if (number >= 2) {
      return "По ключевым словам: ";
    } else if (number < 2) {
      return "По ключевому слову: ";
    }
  }

  function textSpanKeywords(number) {
    if (number >= 4) {
      return '-м другим';
    }
  }

  // вывести ключевые слова с заглавной буквы
  function upperCaseFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  const firstKeyword = `${upperCaseFirst(keywordsArray[0])}`;
  const secondKeyword = `${upperCaseFirst(keywordsArray[1])}`;
  const thirdKeyword = `${upperCaseFirst(keywordsArray[2])}`;

  const numberKeyword = `${keywordsArray.length === 3 ? `${firstKeyword}, ${secondKeyword}, ${thirdKeyword}` : `${firstKeyword}, ${secondKeyword}`}`

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__subtitle">Сохранённые статьи</p>
      <h3 className="saved-news-header__title">{currentUser.name}, у вас&#8201;
        {`${mySavedArticles.length === 0 ? "нет" : mySavedArticles.length}`}<br />{textArticles(mySavedArticles.length)}
      </h3>
      <p className={`${keywordsArray.length > 0 ? "saved-news-header__keyword" : "block-hidden"}`}>{textKeywords(keywordsArray.length)}
        <span className="saved-news-header__keyword-span">
          {keywordsArray.length >= 2 ? `${numberKeyword}` : `${firstKeyword}`}
        </span>
        <span className={`${keywordsArray.length > 3 ? "saved-news-header__keyword-span" : "block-hidden"}`}> и&#8201;
        {keywordsArray.length - 2}{textSpanKeywords(keywordsArray.length)}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
