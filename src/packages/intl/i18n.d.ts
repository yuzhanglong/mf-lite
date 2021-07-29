import {IntlFn} from "@/packages/intl/types";

declare global {
  const intl: IntlFn;

  interface Window {
    intl: IntlFn
  }
}

export {};
