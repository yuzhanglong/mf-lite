import { I18nChunkMap, LANGUAGE_MAP } from '@/packages/intl/common';

const initIntl = async () => {
  await intl.setLocal(LANGUAGE_MAP.zh);
  await intl.register('base', I18nChunkMap).activate('base');
};

initIntl().then(() => {
  const msg = intl('App_Name', {
    name: 'yuzhanglong',
  });
  console.log(msg);
});


