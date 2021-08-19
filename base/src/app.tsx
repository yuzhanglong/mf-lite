import React, { useEffect, useState, Suspense } from 'react';
import './app.css';
import style from './app.module.scss';
import style2 from './app2.module.scss';

const LazyCmp = React.lazy(() => import('./lazy'));
const LayoutCmp = React.lazy(() => import('./layout-cmp'));

const App: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 1000);
  }, []);
  return (
    <Suspense fallback={null}>
      <div className={style.my_test_css}>
        <div className={style2.app2} />
        {isShow && <LazyCmp />}
        <LayoutCmp />
      </div>
    </Suspense>
  );
};

export default App;

