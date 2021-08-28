import React from 'react';
import MicroApp from '../utils/micro-app';

interface VueMicroWrapperProps {

}

const VueMicroWrapper: React.FC<VueMicroWrapperProps> = () => {
  return (
    <div>
      vue micro app
      <MicroApp microAppConfig={{
        name: 'VueMicroApp',
        entry: 'https://micro-fe.yuzzl.top/vue-micro-app',
      }} />
    </div>
  );
};

export default VueMicroWrapper;
