import React from 'react';
import MicroApp from '../utils/micro-app';

interface ReactMicroWrapperProps {

}

const ReactMicroApp: React.FC<ReactMicroWrapperProps> = () => {
  console.log('react!');
  return (
    <div>
      <MicroApp microAppConfig={{
        name: 'ReactMicroApp',
        entry: 'https://micro-fe.yuzzl.top/react-micro-app',
      }} />
    </div>
  );
};

export default ReactMicroApp;
