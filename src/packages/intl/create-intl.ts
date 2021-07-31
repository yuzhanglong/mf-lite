/**
 * File: create-intl.ts
 * Description: create-intl 函数，再一次封装 intl-pool-executor 以方便调用
 * Created: 2021-07-31 10:40:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import { IIntlGroupExecutor, IntlPoolExecutor } from '@/packages/intl/intl-pool-executor';

export type GlobalIntl = IIntlGroupExecutor & {
  (key: string, args: any): string;
}

export function createIntl() {
  const executor = new IntlPoolExecutor();

  const i: GlobalIntl = executor.getMessage.bind(executor);

  i.setLocal = executor.setLocal.bind(executor);

  i.register = executor.register.bind(executor);

  i.unregister = executor.unregister.bind(executor);

  return i;
}
