import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { NavProvider } from './utilities/NavContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <NavProvider> {/* 2. Wrap your App */}
        <App />
      </NavProvider>
    </BrowserRouter>
  </React.StrictMode>,
);