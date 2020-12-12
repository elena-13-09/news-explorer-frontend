import React from 'react';
import './NoResult.css';
import NoResultIcon from '../../images/not-found.svg';
import '../../blocks/block-hidden/block-hidden.css';

function NoResult({
  isNoResult,
  isErrorServer }) {

  return (
    <section className={`${isNoResult ? "no-result" : "block-hidden"}`}>
      <img className="no-result__icon" src={NoResultIcon} alt="Грустный смайл"></img>
      <h3 className="no-result__title">Ничего не найдено</h3>
      <p className="no-result__subtitle">
        {`${isErrorServer ?
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" :
          "К сожалению по вашему запросу ничего не найдено."}`}
      </p>
    </section>
  )
}

export default NoResult;
