import React from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import buttonIconDark from '../../images/button-exit-dark.svg';
import buttonIconWhite from '../../images/button-exit-white.svg';
import './Navigation.css';
import '../../blocks/color-theme/color-theme.css';
import '../../blocks/block-hidden/block-hidden.css';

function Navigation({
  isThemeDark,
  isMenuMobile,
  onLoginClick,
  onMenuMobileClose,
  screenWidth,
  loggedIn,
  onExitClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  const buttonAuth = (
    <button className={`${!loggedIn ? "navigation__button navigation__button_white" : "block-hidden"}`} onClick={onLoginClick}>Авторизоваться</button>
  );

  const buttonExit = (
    <button className={`${loggedIn ? "navigation__button" : "block-hidden"}
    ${isMenuMobile ? "navigation__button_white" : isThemeDark ? "navigation__button_dark" : "navigation__button_white"}`} onClick={onExitClick} >{currentUser.name}
      <img className="navigation__image-exit" src={isMenuMobile ? buttonIconWhite : isThemeDark ? buttonIconDark : buttonIconWhite} alt="Выход" />
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
        className={`${loggedIn ? "navigation__link" : "block-hidden"}
         ${(screenWidth <= 680) && isMenuMobile ? "color-theme_white" : isThemeDark ? "color-theme_dark" : "color-theme_white"}`}
        activeClassName="navigation__link_active" to="/saved-news">Сохранённые статьи
      </NavLink>
    </>
  );
  const navMobile = (
    <nav className="navigation_mobile">
      {navLink}
      {buttonExit}
      {buttonAuth}
    </nav>
  );

  const nav = (
    <nav className="navigation">
      {navLink}
      {buttonExit}
      {buttonAuth}
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
