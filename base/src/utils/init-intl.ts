import { IntlPoolExecutor } from '@attachments/i18n';
import { runInAction } from 'mobx';
import { IIntlGroupExecutor } from '@attachments/i18n/src/types';
import { I18nChunkMap, LANGUAGE_MAP } from '~src/common/const';
import { globalStore } from '~src/store/global-store';

export type GlobalIntl = IIntlGroupExecutor & {
  (key: string, args?: any): string;
}

export const initIntl = async () => {
  const executor = new IntlPoolExecutor();

  // @ts-ignore
  const i18n: GlobalIntl = (key: string, value?: any) => {
    // 保证 ui 更新
    const tmp = () => {
      return globalStore.local;
    };
    tmp();

    return executor.getMessage(key, value);
  };

  i18n.setLocal = async (local: string) => {
    await executor.setLocal(local);
    runInAction(() => {
      globalStore.local = local as LANGUAGE_MAP;
    });
  };

  i18n.register = executor.register.bind(executor);
  i18n.unregister = executor.unregister.bind(executor);


  await i18n.setLocal(LANGUAGE_MAP.zh);
  await i18n
    .register('base-app', I18nChunkMap as any)
    .activate('base-app');

  window.intl = i18n;
};
