/**
 * File: intl-entry.ts
 * Description: intl 出口
 * Created: 2021-07-29 16:26:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { createIntl } from '@/packages/intl/create-intl';

// 暴露出 intl
const i = createIntl();

window.intl = i;

export default i;
