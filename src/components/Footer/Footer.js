import React from 'react';
import { Link } from 'react-router-dom';
import vkIcon from '../../images/vk-icon.svg';
import gitHubIcon from '../../images/github-icon.svg';
import './Footer.css';

function Footer() {
  // скролл наверх
  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <div className="footer__links">
        <ul className="footer__links-info">
          <li className="footer__link-info-li"><Link className="footer__link-info" onClick={backToTop} to="/">Главная</Link></li>
          <li className="footer__link-info-li"><a className="footer__link-info" href="https://praktikum.yandex.ru" target="_blank">Яндекс.Практикум</a></li>
        </ul>
        <ul className="footer__links-cocial">
          <li className="footer__link-cocial-li"><a href="https://github.com/elena-13-09" target="_blank"><img src={gitHubIcon} alt="Иконка GitHub" /></a></li>
          <li className="footer__link-cocial-li"><a href="https://vk.com/goreva.elena" target="_blank"><img src={vkIcon} alt="Иконка Vk" /></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
