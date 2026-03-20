import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 'root' नावाचा एलिमेंट मिळवा
const container = document.getElementById('root');

// जर कंटेनर सापडला तरच React रेंडर करा
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Error: 'root' element सापडला नाही! कृपया index.html तपासा.");
}