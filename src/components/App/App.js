import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import MobileMenuPopup from '../MobileMenuPopup/MobileMenuPopup';
import Main from '../Main/Main';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState('');
  const [inputValues, setInputValues] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [isValid, setisValid] = React.useState(false);

  function updateScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  // валидация форм
  function handleChangeValid(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: e.target.validationMessage });
    setisValid(e.target.form.checkValidity());
  }

  // сброс ошибок валидации
  function resetFormValid() {
    setInputValues('');
    setInputError('');
    setisValid(false);
  }

  // попап авторизации
  function handleLoginClick() {
    setIsLoginPopupOpen(true);
    setIsMenuMobileOpen(false);
  }

  // попап мобильного меню
  function handleMenuMobileOpen() {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  }

  // переключение попапов
  function togglePopupClick() {
    if (isLoginPopupOpen) {
      setIsRegisterPopupOpen(true);
      setIsLoginPopupOpen(false);
      resetFormValid();
    } if (isRegisterPopupOpen) {
      handleLoginClick();
      setIsRegisterPopupOpen(false);
      resetFormValid();
    }
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsMenuMobileOpen(false);
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    resetFormValid();
  }

  // закрытие попапов кликом на оверлей
  function handleOverlayClose(e) {
    if (e.currentTarget === e.target) {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <MobileMenuPopup
        screenWidth={screenWidth}
        isOpen={isMenuMobileOpen}
        isMenuMobile={isMenuMobileOpen}
        onOverlayClose={handleOverlayClose}
      />
      <Switch>
        <Route exact path="/">
          <Header
            screenWidth={screenWidth}
            isMenuMobile={isMenuMobileOpen}
            isThemeDark={false}
            onMenuMobileOpen={handleMenuMobileOpen}
            onMenuMobileClose={closeAllPopups}
            onLoginClick={handleLoginClick}
            isButtonHidden={isLoginPopupOpen || isRegisterPopupOpen}
          />
          <Main />
        </Route>
        <Route path="/saved-news">
          <Header
            screenWidth={screenWidth}
            isMenuMobile={isMenuMobileOpen}
            isThemeDark={true}
            onMenuMobileOpen={handleMenuMobileOpen}
            onMenuMobileClose={closeAllPopups}
            onLoginClick={handleLoginClick}
            isButtonHidden={isLoginPopupOpen || isRegisterPopupOpen}
          />
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        togglePopup={togglePopupClick}
        onOverlayClose={handleOverlayClose}
        onChangeValid={handleChangeValid}
        inputValues={inputValues}
        inputError={inputError}
        isValid={isValid}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        togglePopup={togglePopupClick}
        onOverlayClose={handleOverlayClose}
        onChangeValid={handleChangeValid}
        inputValues={inputValues}
        inputError={inputError}
        isValid={isValid}
      />
    </div>
  );
}

export default App;
