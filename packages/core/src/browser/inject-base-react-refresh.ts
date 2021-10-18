import { injectIntoGlobalHook } from 'react-refresh/cjs/react-refresh-runtime.development';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

/**
 * 基于 webpack module Federation 架构下子应用的 react refresh 补丁
 *
 * @author yuzhanglong
 * @date 2021-09-27 22:19:36
 */
export const injectBaseReactRefresh = () => {
  // Injects the react refresh replacing the one from the base app
  injectIntoGlobalHook(window);
  // Injects the react-dom instance again
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject(ReactDOM);
};
