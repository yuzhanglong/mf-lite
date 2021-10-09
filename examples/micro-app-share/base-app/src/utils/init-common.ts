/**
 * File: init-common.ts
 * Description: 项目全局初始化
 * Created: 2021-09-28 21:51:34
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// patch 基座的 react-refresh
import { consoleTag } from '@attachments/utils/esm/browser/console-tag';

consoleTag(
  {
    key: 'MODE',
    value: __MODE__,
  },
  {
    key: 'VERSION',
    value: __APP_VERSION__,
    valueColor: '#409eff',
  },
  {
    key: 'BUILD_TIME',
    value: __BUILD_TIME__,
    valueColor: '#ea7b27',
  },
);
