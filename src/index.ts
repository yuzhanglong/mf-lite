import { LANGUAGE_MAP } from '@attachments/i18n';
import { I18nChunkMap } from '@/common';

const initIntl = async () => {
  await intl.setLocal(LANGUAGE_MAP.zh);
  await intl.register('base', I18nChunkMap).activate('base');
};

initIntl().then(() => {
  const msg = intl('Yzl_test_Name', {
    name: 'yuzhanglong',
  });
  console.log(msg);
});


