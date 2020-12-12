import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({
  name,
  isOpen,
  onSubmit,
  onClose,
  title,
  button,
  children,
  togglePopup,
  buttonLink,
  onOverlayClose,
  isValid,
  errorText }) {

  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`} onClick={onOverlayClose}>
      <form className={`popup__container popup__container_${name}`} name={name} onSubmit={onSubmit} noValidate>
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <span className="popup__error">{errorText}</span>
        <button className={`${isValid ? "popup__button-submit" : "popup__button-submit popup__button-submit_inactive"}`} type="submit">{button}</button>
        <p className="popup__link">или&#8201;
      <button className="popup__button-link" type="button" onClick={togglePopup}>{buttonLink}</button>
        </p>
      </form>
    </section>
  );
}

export default PopupWithForm;
