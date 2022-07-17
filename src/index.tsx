import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupTranslation } from './i18n/i18n';
import { withTranslation } from 'react-i18next';
import { Auth0Provider } from '@auth0/auth0-react';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
setupTranslation().then(() => {
    const AppContainer = withTranslation()(App);
    ReactDOM.render(
      <React.Suspense fallback={'Loading'}>
        {/* <Auth0Provider
          domain="dev-ufz05wjq.us.auth0.com"
          clientId="NmNtaXKZAzyKjKVissbYbifjCfGESxwg"
          redirectUri={window.location.origin}
        > */}
        <Auth0Provider
          domain="dev-ufz05wjq.us.auth0.com"
          clientId="NmNtaXKZAzyKjKVissbYbifjCfGESxwg"
          redirectUri={window.location.origin}
        >
          <AppContainer />
        </Auth0Provider>
        {/* </Auth0Provider> */}
      </React.Suspense>,
      document.getElementById("root")
    );
  });
reportWebVitals();
