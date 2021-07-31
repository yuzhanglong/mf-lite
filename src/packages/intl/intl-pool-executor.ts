/**
 * File: intl-pool-executor.ts
 * Description: 文案调度池，用来处理多个文案组
 * Created: 2021-07-31 10:28:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import { INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE } from '@/packages/intl/common';
import { IntlGroup } from '@/packages/intl/intl-group';
import { IIntlGroupExecutor } from './types';

interface IntlGroupWrapper {
  name: string;
  isActive: boolean;
  intlGroup: IntlGroup;
}


export class IntlPoolExecutor implements IIntlGroupExecutor {
  // 多个文案组
  intlGroups: IntlGroupWrapper[] = []

  getMessage(key: string, args: any) {
    for (let i = 0; i < this.intlGroups.length; i += 1) {
      const g = this.intlGroups[i].intlGroup;
      const tmpMsg = g.getMessage(key, args);
      if (tmpMsg !== INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE) {
        return tmpMsg;
      }
    }
    throw new Error(`the key ${key} was not found!`);
  }

  async setLocal(local: string) {
    for (let i = 0; i < this.intlGroups.length; i += 1) {
      const g = this.intlGroups[i];
      const { isActive } = g;
      if (isActive) {
        await g.intlGroup.updateCurrentLocal(local, true);
      }
    }
  }

  register(name, sources) {
    if (this.intlGroups.find(item => item.name === name)) {
      console.warn(`message group ${name} has been registered!`);
      return;
    }

    const newIntlGroup = new IntlGroup({
      intlSources: sources
    });

    this.intlGroups.unshift({
      intlGroup: newIntlGroup,
      name: name,
      isActive: false
    });
  };

  unregister(name) {
    const targetGroup = this.intlGroups.findIndex(item => item.name === name);
    if (targetGroup < 0) {
      console.warn(`intl group '${name}' not found!`);
      return;
    }
    this.intlGroups.splice(targetGroup, 1);
  };
}
