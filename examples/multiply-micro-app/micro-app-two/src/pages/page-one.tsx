import React from 'react';
import { subtraction } from 'micro_app_one/subtraction';

interface ProfileProps {

}

const PageOne: React.FC<ProfileProps> = () => {
  return (
    <div>
      我是第二个微应用
      <div>
        {subtraction(100, 100)}
      </div>
    </div>
  );
};

export default PageOne;
