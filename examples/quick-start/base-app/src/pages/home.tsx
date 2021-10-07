import React from 'react';
import './home.less';
import { createMicroApp } from '~src/utils/create-micro-app';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className={'base-app-home'}>
      <div className={'title'}>
        🎉 This is Base App home page, the micro app will be rendered below! 🎉
      </div>
      <div className={'content'}>
        {createMicroApp('micro-app-react')()}
      </div>
    </div>
  );
};

export default Home;
