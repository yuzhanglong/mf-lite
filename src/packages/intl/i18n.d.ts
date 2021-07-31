import { GlobalIntl } from '@/packages/intl/types';

declare global {
  const intl: GlobalIntl;

  interface Window {
    intl: GlobalIntl
  }
}

export {};
