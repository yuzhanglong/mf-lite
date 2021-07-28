import {IntlFn} from "@/packages/intl/create-intl";

declare global {
  const intl: IntlFn

  interface Window {
    intl: IntlFn
  }
}

export {}
