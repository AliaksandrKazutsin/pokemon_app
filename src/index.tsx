
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './common/app/app';
import './index.css';
import { store } from './redux/store';

const app: JSX.Element = (
  <Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

render(app, document.getElementById('root') as HTMLElement | any);