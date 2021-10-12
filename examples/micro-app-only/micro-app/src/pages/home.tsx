import React from 'react';
import { RouteComponentProps } from 'react-router';
import './home.less';

interface HomeProps extends RouteComponentProps {

}

const Home: React.FC<HomeProps> = () => {
  // @ts-ignore
  return (
    <div className={'react-app-home'}>
      这是本地的代码~
    </div>
  );
};

export default Home;
