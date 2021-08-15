import ReactDOM from 'react-dom';
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      Hello React.js!
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react-app'),
);


