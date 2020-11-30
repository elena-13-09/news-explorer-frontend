import React from 'react';
import { NavLink } from 'react-router-dom';
import buttonExitIcon from '../../images/button-exit.svg';
import '../../blocks/color-theme/color-theme.css';
import './Navigation.css';

function Navigation({ isThemeDark, isMenuMobile, onLoginClick, onMenuMobileClose, screenWidth }) {
  const buttonAuth = (
    <button className="navigation__button navigation__button_white" onClick={onLoginClick} >Авторизоваться</button>
  );

  const buttonExit = (
    <button className="navigation__button navigation__button_dark">Грета
      <img className="navigation__image-exit" src={buttonExitIcon} alt="Выход" />
    </button>
  );

  const navLink = (
    <>
      <NavLink
        onClick={onMenuMobileClose}
        className={`navigation__link ${(screenWidth <= 680) && isMenuMobile ? "color-theme_white" : isThemeDark ? "color-theme_dark" : "color-theme_white"}`}
        activeClassName="navigation__link_active" exact to="/">Главная
      </NavLink>
      <NavLink
        onClick={onMenuMobileClose}
        className={`navigation__link ${(screenWidth <= 680) && isMenuMobile ? "color-theme_white" : isThemeDark ? "color-theme_dark" : "color-theme_white"}`}
        activeClassName="navigation__link_active" to="/saved-news">Сохранённые статьи
      </NavLink>
    </>
  );
  const navMobile = (
    <nav className="navigation_mobile">
      {navLink}{isThemeDark ? buttonExit : buttonAuth}
    </nav>
  );

  const nav = (
    <nav className="navigation">
      {navLink}{isThemeDark ? buttonExit : buttonAuth}
    </nav>
  );

  return (
    <>
      {(screenWidth <= 680) && isMenuMobile && navMobile}
      {(screenWidth > 680) && nav}
    </>
  );
}

export default Navigation;
