import React from 'react';
import './NoResult.css';
import NoResultIcon from '../../images/not-found.svg';

function NoResult() {
  return (
    <section className="no-result">
      <img className="no-result__icon" src={NoResultIcon} alt="Грустный смайл"></img>
      <h3 className="no-result__title">Ничего не найдено</h3>
      <p className="no-result__subtitle">К сожалению по вашему запросу ничего<br />не найдено.</p>
    </section>
  )
}

export default NoResult;
