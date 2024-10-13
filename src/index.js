import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';  // فقط CSS
import { Modal, Button } from 'bootstrap';      // استيراد مكونات محددة فقط


import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);


reportWebVitals();
