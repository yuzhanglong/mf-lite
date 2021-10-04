import React, { useEffect, useRef } from 'react';
import { MicroApp, MicroAppRef } from '@attachments/module-federation-toolkits/esm/browser/micro-app';
import { MICRO_APPS, MicroAppConfig } from '~src/common/const';


export const getMicroApp = (name: string): MicroAppConfig => {
  const item = MICRO_APPS.find(res => res.name === name);
  if (!item) {
    throw new Error(`the micro app ${name} is not exist!`);
  }
  return item;
};


export const createMicroApp = (name: string) => {
  return () => {
    const ref = useRef<MicroAppRef>(null);

    useEffect(() => {
      if (ref.current?.appStore) {
        ref.current?.appStore.microApp?.loadPromise
          .then(() => {
            console.log('micro app loaded!');
          });
      }
    }, []);

    return (
      <MicroApp
        ref={ref}
        microAppConfig={{
          name: name,
          entry: getMicroApp(name).url,
        }} />
    );
  };
};
