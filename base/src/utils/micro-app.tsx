/**
 * File: micro-app.tsx
 * Description: 微应用组件
 * Created: 2021-08-21 11:49:35
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useEffect, useRef } from 'react';
import { loadMicroApp, ObjectType } from 'qiankun';
import { LoadableApp, MicroApp as IMicroApp } from 'qiankun/es/interfaces';

interface MicroAppProps {
  microAppConfig: Omit<LoadableApp<ObjectType>, 'container'>;
}

interface MicroAppCmpStore {
  microApp: IMicroApp | null;
  containerRef: HTMLElement | null;
}

const MicroApp: React.FC<MicroAppProps> = (props) => {
  const { current } = useRef<MicroAppCmpStore>({
    containerRef: null,
    microApp: null,
  });

  useEffect(() => {
    if (current.containerRef) {
      current.microApp = loadMicroApp({
        ...props.microAppConfig,
        container: current.containerRef,
      }, {
        sandbox: {
          experimentalStyleIsolation: true,
        },
      });
    }

    return () => {
      current.microApp?.unmount();
    };
  }, []);

  useEffect(() => {
    if (current.microApp && current.microApp.update) {
      current.microApp.update({});
    }
  }, []);
  return (
    <div className={`micro-app-${props.microAppConfig.name}`} ref={(ref) => {
      current.containerRef = ref;
    }} />
  );
};

export default MicroApp;
