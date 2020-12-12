import React from 'react';
import Navigation from '../Navigation/Navigation';
import './MobileMenuPopup.css';

function MobileMenuPopup({
  isOpen,
  isMenuMobile,
  screenWidth,
  onOverlayClose }) {

  return (
    <section className={`popup-mobile ${(screenWidth <= 680) && isOpen && "popup-mobile_opened"}`} onClick={onOverlayClose}>
      <Navigation isMenuMobile={isMenuMobile} />
    </section>
  );
}

export default MobileMenuPopup;
