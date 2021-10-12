import React from 'react';
import './home.less';
import { createMicroApp } from '~src/utils/create-micro-app';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className={'base-app-home'}>
      <div className={'title'}>
        🎉 Two micro apps will be rendered below!!!
      </div>
      <div className={'content'}>
        {createMicroApp('micro-app-one')()}
      </div>
      <div className={'content'}>
        {createMicroApp('micro-app-two')()}
      </div>
    </div>
  );
};

export default Home;
