// @ts-ignore
import { injectBaseReactRefresh } from '@attachments/module-federation-toolkits/esm/browser/inject-base-react-refresh';

if (process.env.NODE_ENV === 'development') {
  injectBaseReactRefresh();
}
