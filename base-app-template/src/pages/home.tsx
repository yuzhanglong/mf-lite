import React from 'react';
import { renderRoutes } from 'react-router-config';
import './home.less';
import { RouteComponentProps } from 'react-router';

interface HomeProps extends RouteComponentProps {

}

const Home: React.FC<HomeProps> = (props) => {
  // @ts-ignore
  const { route } = props;

  return (
    <div className={'base-app-home'}>
      <div className={'title'}>
        🎉 This is Base App home page, the micro app will be rendered below! 🎉
      </div>
      <div className={'content'}>
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default Home;
