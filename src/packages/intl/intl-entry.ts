/**
 * File: intl-entry.ts
 * Description: 注册全局 intl 方法
 * Created: 2021-07-29 16:26:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { createIntl } from '@/packages/intl/create-intl';
import { LANGUAGE_MAP } from '@/packages/intl/common';

const intl = createIntl(LANGUAGE_MAP.zh);

window.intl = intl;

export default intl;
