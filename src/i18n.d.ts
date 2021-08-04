import { GlobalIntl } from '@attachments/i18n';

declare global {
  const intl: GlobalIntl;

  interface Window {
    intl: GlobalIntl;
  }
}

export {};
