import { createIntl } from '@attachments/i18n';


export const initIntl = async () => {
  const i18n = createIntl();
  await i18n.setLocal('zh-cn');

  await i18n
    .register('base-app', {
      'zh-cn': () => {
        return {
          'Hello_World': '你好，世界!🎉',
        };
      },
      'en-us': () => {
        return {
          'Hello_World': 'hello world!🎉',
        };
      },
    })
    .activate('base-app');

  // @ts-ignore
  window.intl = i18n;
};
