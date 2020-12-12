import React from 'react';
import './InfoTooltipPopup.css';

function InfoTooltipPopup({
  isOpen,
  onClose,
  togglePopup,
  onOverlayClose }) {

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} onClick={onOverlayClose}>
      <div className="popup__container popup__container_info">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <h3 className="popup__title">Пользователь успешно<br /> зарегистрирован!</h3>
        <button className="popup__button-info" type="button" onClick={togglePopup}>Войти</button>
      </div>
    </section>
  );
}

export default InfoTooltipPopup;
