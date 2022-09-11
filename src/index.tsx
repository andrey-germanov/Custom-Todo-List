import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n';
import { withTranslation } from 'react-i18next';
import { Auth0Provider } from '@auth0/auth0-react';
import { setupTranslation } from './i18n/i18n';

setupTranslation().then(() => {
    const AppContainer = withTranslation()(App);
    ReactDOM.render(
      <React.Suspense fallback={'Loading'}>
        <Auth0Provider
          domain="dev-ufz05wjq.us.auth0.com"
          clientId="NmNtaXKZAzyKjKVissbYbifjCfGESxwg"
          redirectUri={window.location.origin}
        >
          <AppContainer />
        </Auth0Provider>
      </React.Suspense>,
      document.getElementById("root")
    );
  });
reportWebVitals()