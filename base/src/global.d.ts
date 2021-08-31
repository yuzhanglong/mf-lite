import { GlobalIntl } from '~src/utils/init-intl';

declare module '*.module.css';
declare module '*.module.sass';
declare module '*.module.scss';


declare global {
  const intl: GlobalIntl;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
    intl: GlobalIntl;
  }
}


export {};

