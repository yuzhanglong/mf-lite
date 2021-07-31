/**
 * File: intl-pool-executor.spec.ts
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
  // 维护多个文案组
  intlGroups: IntlGroupWrapper[] = []

  // 设置这个变量的原因如下：
  // 由于性能要求，在 setLocal 的时候我们只会去处理活跃的文案组，
  // 例如在微前端架构下没有展示的微应用也有对应的文案组(未激活状态，isActive = false)，
  // 于是也没必要 setLocal 去拉取它的的文案 js 文件
  currentLocal: string = ''


  /**
   * 通过名称，匹配相应的文案组，如果没有，则返回一个 undefined
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:02:30
   * @param name 文案组名称
   */
  getIntlGroupWrapperByName(name: string) {
    return this.intlGroups.find(item => item.name === name);
  }

  /**
   * 获取文案内容
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:15:42
   * @param key 文案 key
   * @param args 文案参数
   */
  getMessage(key: string, args: any) {
    if (!this.currentLocal) {
      throw new Error('your should set local string at first!');
    }

    for (let i = 0; i < this.intlGroups.length; i += 1) {
      const { intlGroup, isActive } = this.intlGroups[i];
      if (isActive) {
        const tmpMsg = intlGroup.getMessage(key, args);
        if (tmpMsg !== INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE) {
          return tmpMsg;
        }
      }
    }
    throw new Error(`the key '${key}' was not found!`);
  }

  async setLocal(local: string) {
    for (let i = 0; i < this.intlGroups.length; i += 1) {
      const g = this.intlGroups[i];
      const { isActive, intlGroup } = g;
      if (isActive) {
        await intlGroup.updateCurrentLocal(local, true);
      }
    }
    this.currentLocal = local;
  }

  /**
   * 注册一个文案组
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:23:57
   * @param name 文案组名称
   * @param sources 文案源
   */
  register(name, sources) {
    if (this.getIntlGroupWrapperByName(name)) {
      console.warn(`message group '${name}' has been registered!`);
      return;
    }

    const newIntlGroup = new IntlGroup({
      intlSources: sources
    });

    const wrapperItem = {
      intlGroup: newIntlGroup,
      name: name,
      isActive: false
    };

    this.intlGroups.unshift(wrapperItem);
    return this;
  };

  /**
   * 卸载某个文案组
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:09:31
   * @param name 需要卸载的文案组名称
   */
  unregister(name: string) {
    const targetGroup = this.intlGroups.findIndex(item => item.name === name);
    if (targetGroup < 0) {
      console.warn(`intl group '${name}' not found!`);
      return;
    }
    this.intlGroups.splice(targetGroup, 1);
    return this;
  };

  /**
   * 激活某个文案组
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:00:23
   * @param name 需要激活的文案组的名称
   */
  async activate(name: string) {
    const item = this.getIntlGroupWrapperByName(name);
    if (!item) {
      console.warn(`intl group '${name}' not found!`);
      return;
    }
    item.isActive = true;
    await item.intlGroup.updateCurrentLocal(this.currentLocal, true);
  }

  /**
   * 取消激活某个文案组
   *
   * @author yuzhanglong
   * @date 2021-07-31 14:08:55
   * @param name 需要取消激活的文案组的名称
   */
  deactivate(name: string) {
    const item = this.getIntlGroupWrapperByName(name);
    if (!item) {
      console.warn(`intl group '${name}' not found!`);
      return;
    }
    item.isActive = false;
  }
}
