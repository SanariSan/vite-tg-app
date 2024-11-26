import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppContainerMemo } from './containers/app';
import { initI18n } from './i18n';
import './index.scss';

initI18n();

console.debug('NODE_ENV:', process.env.NODE_ENV);
console.debug('API_URL:', process.env.API_URL);

let appElement = document.getElementById('app');
if (appElement === null) {
  appElement = document.createElement('div');
  appElement.id = 'app';
  document.body.appendChild(appElement);
}

const root = createRoot(appElement);
root.render(
  <React.StrictMode>
    <AppContainerMemo />,
  </React.StrictMode>,
);
