import React from 'react';
import logo from './logo.svg';
import './App.css';
import i18next from 'i18next';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useAuth0, User } from '@auth0/auth0-react';
import LogoutButton from './Auth0/LogoutButton';
import LoginButton from './Auth0/LoginButton';
import Profile from './Auth0/Profile';

function App({t}:WithTranslation ) {
  const { isAuthenticated }: User = useAuth0();

  const setLanguage = (language: string) => {
    i18next.changeLanguage(language);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Profile />
      { isAuthenticated ? <LogoutButton /> : <LoginButton />}
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setLanguage("en")}>ENGLISH</button>
        <button onClick={() => setLanguage("ru")}>ru</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {t('High')}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
