import ReactDOM from 'react-dom';
import React from 'react';
import './app.css';
import LayoutCmp from './layout-cmp';

const App: React.FC = () => {
  return (
    <div>
      <LayoutCmp/>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('base-app'),
);


