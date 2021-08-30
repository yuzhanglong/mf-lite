declare module '*.module.css';
declare module '*.module.sass';
declare module '*.module.scss';


interface Window {
  intl: (name: string, args: Record<any, any>) => void;
}
