import { IntlSources } from '@/packages/intl/types';
import { INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE } from '@/packages/intl/common';
import { IntlGroup } from '@/packages/intl/intl-group';

export interface IntlExecutor {
  (key: string, args: any): string;

  // 修改当前语言
  setLocal: (local: string) => Promise<void>;

  // 注册一个 intl group
  register: (name: string, sources: IntlSources) => void;

  // 移除一个 intl group
  unregister: (name: string) => void;
}

interface IntlGroupWrapper {
  name: string;
  intlGroup: IntlGroup;
}

export function createIntl() {
  // 多个文案组
  const intlGroups: IntlGroupWrapper[] = [];

  const intlExecutor = ((key, args) => {
    for (let i = 0; i < intlGroups.length; i += 1) {
      const g = intlGroups[i].intlGroup;
      const tmpMsg = g.getMessage(key, args);
      if (tmpMsg !== INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE) {
        return tmpMsg;
      }
    }
    throw new Error(`the key ${key} was not found!`);
  }) as IntlExecutor;

  intlExecutor.setLocal = async (local: string) => {

  };

  intlExecutor.register = (name, sources) => {
    if (intlGroups.find(item => item.name === name)) {
      console.warn(`message group ${name} has been registered`);
      return;
    }

    const newIntlGroup = new IntlGroup({
      intlSources: sources,
    });

    intlGroups.unshift({
      intlGroup: newIntlGroup,
      name: name,
    });
  };

  intlExecutor.unregister = (name) => {
    const targetGroup = intlGroups.findIndex(item => item.name === name);
    if (targetGroup < 0) {
      console.warn(`intl group '${name}' not found!`);
      return;
    }
    intlGroups.splice(targetGroup, 1);
  };

  return intlExecutor;
}
