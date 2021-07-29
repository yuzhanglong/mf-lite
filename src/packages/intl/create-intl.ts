import {IntlExecutor} from "@/packages/intl/intl-executor";
import { IntlFn, IntlSources } from '@/packages/intl/types';


export function createIntl(locale: string, sources?: IntlSources) {
  const intlExecutor = new IntlExecutor({
    intlSources: sources || {}
  });

  const intlFn: IntlFn = ((key, args) => {
    return intlExecutor.getMessage(key, args);
  });

  return intlFn;
}
