import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './pages/App';
import { BrowserRouter } from "react-router-dom";
import { store } from './store';

// setup fake backend
import { fakeBackend } from './services';
fakeBackend();

const root = ReactDOM.createRoot(document.getElementById('root'));
// const container = createRoot(container)


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

