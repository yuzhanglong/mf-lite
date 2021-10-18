import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { loadMicroApp, ObjectType } from 'qiankun';
import { LoadableApp, MicroApp as IMicroApp } from 'qiankun/es/interfaces';

interface MicroAppProps {
  microAppConfig: Omit<LoadableApp<ObjectType>, 'container'>;
}

interface MicroAppCmpStore {
  microApp: IMicroApp | null;
  containerRef: HTMLElement | null;
}

export interface MicroAppRef {
  appStore: MicroAppCmpStore;
}


export const MicroApp = forwardRef<MicroAppRef, MicroAppProps>((props, microAppRef) => {
  const { current } = useRef<MicroAppCmpStore>({
    containerRef: null,
    microApp: null,
  });

  const loadApp = () => {
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
  };

  useEffect(() => {
    loadApp();

    return () => {
      current.microApp?.unmount();
    };
  }, []);

  useEffect(() => {
    if (current.microApp && current.microApp.update) {
      current.microApp.update({});
    }
  }, []);


  useImperativeHandle(microAppRef, () => {
    return {
      appStore: current,
    };
  });

  return (
    <div className={`micro-app-${props.microAppConfig.name}`} ref={(ref) => {
      current.containerRef = ref;
    }} />
  );
});
