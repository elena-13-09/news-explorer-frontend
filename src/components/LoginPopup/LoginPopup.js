import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './LoginPopup.css';


function LoginPopup({ isOpen, onClose, onChangeValid, togglePopup, onOverlayClose, inputValues, inputError, isValid }) {

  return (
    <PopupWithForm
      title="Вход"
      name="login"
      button="Войти"
      buttonLink="Зарегистрироваться"
      isOpen={isOpen}
      onClose={onClose}
      togglePopup={togglePopup}
      onOverlayClose={onOverlayClose}
      isValid={isValid}
    >
      <fieldset
        className="popup__field">
        <p className="popup__input-title">Email</p>
        <input
          onChange={onChangeValid}
          value={inputValues.email || ""}
          className="popup__input"
          type="email"
          name="email"
          placeholder="Введите почту"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{inputError.email}</span>
        <p className="popup__input-title">Пароль</p>
        <input
          onChange={onChangeValid}
          value={inputValues.password || ""}
          className="popup__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          minLength="8"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{inputError.password}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default LoginPopup;
