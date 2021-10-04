declare module '*.module.css';
declare module '*.module.sass';
declare module '*.module.scss';


declare global {
  const __APP_VERSION__: string;
  const __MODE__: string;
  const __BUILD_TIME__: string;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
  }
}


export {};

