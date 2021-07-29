/**
 * File: intl-register.ts
 * Description: 注册全局 intl 方法
 * Created: 2021-07-29 16:26:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {createIntl} from "@/packages/intl/create-intl";

const intl = createIntl('zh-cn');

window.intl = intl;

export default intl;
