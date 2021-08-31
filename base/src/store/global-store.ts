import { observable } from 'mobx';
import { LANGUAGE_MAP } from '~src/common/const';

export const globalStore = observable({
  local: LANGUAGE_MAP.zh,
});
