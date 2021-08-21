import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {

}

const App: React.FC<AppProps> = () => {
  return (
    <div>hello</div>
  );
};

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};
