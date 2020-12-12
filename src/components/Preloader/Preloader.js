import React from 'react';
import './Preloader.css';
import '../../blocks/block-hidden/block-hidden.css';

function Preloader({ isPreloader }) {
  return (
    <section className={`${isPreloader ? "preloader" : "block-hidden"}`}>
      <i className="preloader__circle"></i>
      <p className="preloader__text">Идет поиск новостей...</p>
    </section>
  );
}

export default Preloader;
