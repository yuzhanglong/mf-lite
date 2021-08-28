// @ts-ignore
import React from 'base_app/react';
// @ts-ignore
import ReactDOM from 'base_app/react-dom';

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
