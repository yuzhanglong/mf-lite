import React from 'react';
import add from 'base_app/shared-utils';
import './home.less';

interface ProfileProps {

}

const PageOne: React.FC<ProfileProps> = () => {
  return (
    <div>
      <div>Page One</div>
      <div className={'parent-method'}>来自父应用的方法：100 + 100 = {add(100, 100)}</div>
    </div>
  );
};

export default PageOne;
