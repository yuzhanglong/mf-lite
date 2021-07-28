import {IntlExecutor, IntlSources} from "@/packages/intl/intl-executor";

interface IntlUtils {
  intlFn: IntlFn
}

export type IntlFn = (key: string, args?: Record<string, any>) => string

export function createIntl(locale: string, sources?: IntlSources) {
  const intlExecutor = new IntlExecutor({
    intlSources: sources || {}
  })

  const intlFn: IntlFn = ((key, args) => {
    return intlExecutor.getMessage(key, args)
  })

  return intlFn
}

const intl = createIntl('zh-cn');

window.intl = intl

export default intl
