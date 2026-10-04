import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import History from './History';

function Root() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/history' element={<History />} />
        <Route path='*' element={<App />} />
      </Routes>
    </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
