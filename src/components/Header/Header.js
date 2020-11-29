import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import '../../blocks/color-theme/color-theme.css';
import '../../blocks/block-hidden/block-hidden.css';

function Header({ isThemeDark, onMenuMobileOpen, onMenuMobileClose, isMenuMobile, screenWidth, onLoginClick, isButtonHidden }) {

  const buttonMenuMobile = (
    <button className={`header__button-menu ${isMenuMobile ? "header__button-menu_active" : isButtonHidden && "block-hidden"}`} type="button"
      onClick={onMenuMobileOpen}>
      <span className={`header__button-line ${isThemeDark ? "color-theme_background-dark" : "color-theme_background-white"}`} />
      <span className={`header__button-line ${isThemeDark ? "color-theme_background-dark" : "color-theme_background-white"}`} />
    </button>
  );

  return (
    <header className={`header ${(screenWidth <= 680) && isMenuMobile ? "color-theme_background-dark" : isThemeDark ? "header__border-dark" : "header__border-white"}`} >
      <Link onClick={onMenuMobileClose}
        className={`header__title ${(screenWidth <= 680) && isMenuMobile ? "color-theme_white" : isThemeDark ? "color-theme_dark" : "color-theme_white"}`} to="/">NewsExplorer
      </Link>
      {(screenWidth <= 680) && buttonMenuMobile}
      <Navigation
        onLoginClick={onLoginClick}
        isButtonHidden={isButtonHidden}
        screenWidth={screenWidth}
        isThemeDark={isThemeDark}
        isMenuMobile={isMenuMobile}
        onMenuMobileClose={onMenuMobileClose}
      />
    </header>
  );
}

export default Header;





