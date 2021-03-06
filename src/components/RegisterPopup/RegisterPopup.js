import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup({
  isOpen,
  onClose,
  onChangeValid,
  togglePopup,
  onOverlayClose,
  inputValues,
  inputError,
  isValid,
  onRegister,
  errorText }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(inputValues.email, inputValues.password, inputValues.name);
  }

  return (
    <PopupWithForm
      title="Регистрация"
      name="register"
      button="Зарегистрироваться"
      buttonLink="Войти"
      errorText={errorText}
      isOpen={isOpen}
      onClose={onClose}
      togglePopup={togglePopup}
      onOverlayClose={onOverlayClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset
        className="popup__field">
        <p className="popup__input-title">Email</p>
        <input
          onChange={onChangeValid}
          value={inputValues.email || ''}
          className="popup__input"
          type="email"
          name="email"
          placeholder="Введите почту"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{inputError.email || ''}</span>
        <p className="popup__input-title">Пароль</p>
        <input
          onChange={onChangeValid}
          value={inputValues.password || ''}
          className="popup__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          minLength="8"
          maxLength="40"
          required
        />
        <span className="popup__input-error">{inputError.password || ''}</span>
        <p className="popup__input-title">Имя</p>
        <input
          onChange={onChangeValid}
          value={inputValues.name || ''}
          className="popup__input"
          type="text"
          name="name"
          placeholder="Введите своё имя"
          minLength="1"
          maxLength="20"
          required
        />
        <span className="popup__input-error">{inputError.name || ''}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default RegisterPopup;
