
declare global {
  const intl: (name: string, args?: Record<any, any>) => string;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
  }
}


export {};
