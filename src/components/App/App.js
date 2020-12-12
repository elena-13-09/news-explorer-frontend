import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import MobileMenuPopup from '../MobileMenuPopup/MobileMenuPopup';
import Main from '../Main/Main';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import InfoTooltipPopup from '../InfoTooltipPopup/InfoTooltipPopup';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import * as MainApi from '../../utils/MainApi';
import * as NewsApi from '../../utils/NewsApi';
import './App.css';

function App() {
  // данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // новостные статьи
  const [articles, setArticles] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [mySavedArticles, setMySavedArticles] = React.useState([]);
  // попапы
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = React.useState(false);
  const [isInfoTooltipPopup, setInfoTooltipPopup] = React.useState(false);
  // валидация форм
  const [inputValues, setInputValues] = React.useState({});
  const [inputError, setInputError] = React.useState({});
  const [isValid, setisValid] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const [preloader, setPreloader] = React.useState(false);
  const [isNoResult, setIsNoResult] = React.useState(false);
  const [isErrorServer, setIsErrorServer] = React.useState(false);
  // статус пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState('');

  const [screenWidth, setScreenWidth] = React.useState('');

  const history = useHistory();

  // ширина экрана
  function updateScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', updateScreenWidth);
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  // валидация форм
  function handleChangeValid(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: e.target.validationMessage });
    setisValid(e.target.closest('form').checkValidity());
  }

  // сброс ошибок валидации
  function resetFormValid() {
    setInputValues({});
    setInputError({});
    setisValid(false);
    setErrorText('');
  }

  // попап авторизации
  function handleLoginClick() {
    setIsLoginPopupOpen(true);
    setIsMenuMobileOpen(false);
  }

  // попап регистрации
  function handleRegisterClick() {
    setIsRegisterPopupOpen(true);
  }

  // попап мобильного меню
  function handleMenuMobileOpen() {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  }

  // попап успешной регистрации
  function handleInfoTooltipPopup() {
    setInfoTooltipPopup(true);
    setIsRegisterPopupOpen(false);
  }

  // переключение попапов
  function togglePopupClick() {
    if (isLoginPopupOpen) {
      handleRegisterClick();
      setIsLoginPopupOpen(false);
      resetFormValid();
    } if (isRegisterPopupOpen) {
      handleLoginClick();
      setIsRegisterPopupOpen(false);
      resetFormValid();
    } if (isInfoTooltipPopup) {
      handleLoginClick();
      setInfoTooltipPopup(false);
      resetFormValid();
    }
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsMenuMobileOpen(false);
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setInfoTooltipPopup(false);
    resetFormValid();
  }

  // закрытие попапов кликом на оверлей
  function handleOverlayClose(e) {
    if (e.currentTarget === e.target) {
      closeAllPopups();
    }
  }

  // закрытие попапов клавишей Escape
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  // Сохранение токена в локальное хранилище
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Promise
        .all([
          MainApi.getUserInfo(jwt, token),
          MainApi.getMyArticles(jwt, token)
        ])
        .then(([user, savedArticles]) => {
          setCurrentUser(user);
          setMySavedArticles(savedArticles.reverse(), token);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
    setKeyword(localStorage.getItem('keyword'));
    const articles = JSON.parse(localStorage.getItem('articles'));
    setArticles(articles || []);
  }, [token]);

  // Регистрация
  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then((res) => {
        if (res) {
          handleInfoTooltipPopup();
        }
      })
      .catch((err) => {
        if (err.statusCode === 409 || 403) {
          setErrorText("Пользователь с таким email уже зарегистрирован");
        } else {
          setErrorText("Что-то пошло не так! Попробуйте ещё раз.");
        }
      });
  }

  // Авторизация
  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
          MainApi.getUserInfo(res.token)
          setLoggedIn(true);
          setToken(res.token);
          history.push('/');
          closeAllPopups();
        }
      })
      .catch((err) => {
        if (err.statusCode === 401 || 400) {
          setErrorText("Неправильные почта или пароль");
        } else {
          setErrorText("Что-то пошло не так! Попробуйте ещё раз.");
        }
      });
  }

  // Выход
  function handleExitClick() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('articles');
    localStorage.removeItem('keyword');
    setArticles([]);
    history.push('/');
  }

  // поиск статей
  function handleSearchNews(keyword) {
    setArticles([]);
    setPreloader(true);
    setIsNoResult(false);
    NewsApi.getNewsArticle(keyword)
      .then((res) => {
        if (res) {
          localStorage.setItem('articles', JSON.stringify(res.articles));
          localStorage.setItem('keyword', keyword);
          setArticles(res.articles);
          setKeyword(keyword);
        }
        if (res.articles.length === 0) {
          setIsNoResult(true);
        }
      })
      .catch((err) => {
        setIsErrorServer(true);
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // сохранение статьи
  function handleSaveArticles(article, keyword) {
    MainApi.saveArticle(article, keyword.toLowerCase())
      .then((res) => {
        if (res) {
          setMySavedArticles([...mySavedArticles, res]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // удаление статьи
  function handleDeleteSaveArticles(articles) {
    MainApi.deleteArticle(articles)
      .then(() => {
        const arrayArticles = mySavedArticles.filter((i) => (i._id !== articles));
        setMySavedArticles(arrayArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // проверяем есть ли новость в сохраненных статьях
  function findMySevedArticles(article, keyword, myArticle) {
    const arrayArticles = mySavedArticles.find((i) => {

      if (article) {
        return i.title === article.title && i.text === article.description;
      }
      if (myArticle) {
        return i.title === myArticle.title && i.text === myArticle.text;
      }
    });

    if (arrayArticles) {
      // если есть удаляем новость
      handleDeleteSaveArticles(arrayArticles._id);
    } else {
      // если нет сохраняем
      handleSaveArticles(article, keyword);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header
              screenWidth={screenWidth}
              isMenuMobile={isMenuMobileOpen}
              isThemeDark={false}
              onMenuMobileOpen={handleMenuMobileOpen}
              onMenuMobileClose={closeAllPopups}
              onLoginClick={handleLoginClick}
              isButtonHidden={isLoginPopupOpen || isRegisterPopupOpen || isInfoTooltipPopup}
              loggedIn={loggedIn}
              onExitClick={handleExitClick}
            />
            <Main
              onSearchNews={handleSearchNews}
              articles={articles}
              isPreloader={preloader}
              isNoResult={isNoResult}
              isErrorServer={isErrorServer}
              findMySevedArticles={findMySevedArticles}
              mySavedArticles={mySavedArticles}
              keyword={keyword}
              onRegister={handleRegisterClick}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/saved-news">
            <Header
              screenWidth={screenWidth}
              isMenuMobile={isMenuMobileOpen}
              isThemeDark={true}
              onMenuMobileOpen={handleMenuMobileOpen}
              onMenuMobileClose={closeAllPopups}
              onLoginClick={handleLoginClick}
              loggedIn={loggedIn}
              onExitClick={handleExitClick}
            />
            <ProtectedRoute path="/saved-news"
              loggedIn={loggedIn}
              component={SavedNews}
              findMySevedArticles={findMySevedArticles}
              mySavedArticles={mySavedArticles}
            >
            </ProtectedRoute>
            <Route>
              {loggedIn ? <Redirect to="/saved-news" /> : <Redirect to="/" />}
            </Route>
          </Route>
        </Switch>
        <Footer />
        <MobileMenuPopup
          screenWidth={screenWidth}
          isOpen={isMenuMobileOpen}
          isMenuMobile={isMenuMobileOpen}
          onOverlayClose={handleOverlayClose}
        />
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          togglePopup={togglePopupClick}
          onOverlayClose={handleOverlayClose}
          onChangeValid={handleChangeValid}
          inputValues={inputValues}
          inputError={inputError}
          isValid={isValid}
          onLogin={handleLogin}
          errorText={errorText}
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
          onRegister={handleRegister}
          errorText={errorText}
        />
        <InfoTooltipPopup
          isOpen={isInfoTooltipPopup}
          onClose={closeAllPopups}
          togglePopup={togglePopupClick}
          onOverlayClose={handleOverlayClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
