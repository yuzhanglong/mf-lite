import React from 'react';
import MicroApp from './micro-app';

interface ReactMicroWrapperProps {

}

const ReactMicroWrapper: React.FC<ReactMicroWrapperProps> = () => {
  return (
    <div>
      react micro app
      <MicroApp microAppConfig={{
        name: 'ReactMicroApp',
        entry: 'https://micro-fe.yuzzl.top/react-micro-app',
      }} />
    </div>
  );
};

export default ReactMicroWrapper;
