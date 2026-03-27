import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // तुमची App.jsx फाईल वापरण्यासाठी
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

reportWebVitals();