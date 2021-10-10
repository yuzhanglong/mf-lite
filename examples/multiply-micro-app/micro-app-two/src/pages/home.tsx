import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { RouteComponentProps } from 'react-router';
import './home.less';
import add from 'base_app/shared-utils';

interface HomeProps extends RouteComponentProps {

}

const Home: React.FC<HomeProps> = (props) => {
  // @ts-ignore
  const { route, history, location } = props;
  const [currentPage, setCurrentPage] = useState<'one' | 'two'>(
    location.pathname === '/page-two' ? 'two' : 'one'
  );

  const handleButtonClick = () => {
    const nextPage = currentPage === 'one' ? 'two' : 'one';
    setCurrentPage(nextPage);
    history.push(`page-${nextPage}`);
  };

  return (
    <div className={'react-app-home'}>
      <div className={'button-wrapper'}>
        <button className={'button'} onClick={() => handleButtonClick()}>
          {`We are at page ${currentPage}, click to change!`}
        </button>
      </div>
      <div className={'home-content'}>
        <div>
          我是2号子应用
        </div>
        <div>
          尝试消费基座应用的加法函数：[150 + 150 = {add(150, 150)}]
        </div>
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default Home;
