import { colors, createTheme } from '@material-ui/core';
import { zhCN, enUS } from '@material-ui/core/locale';
import shadows from './shadows';
import typography from './typography';
import { LANGUAGE_MAP } from '~src/common/const';

export const getThemes = (local: LANGUAGE_MAP) => {
  const theme = {
    palette: {
      background: {
        default: '#F4F6F8',
        paper: colors.common.white,
      },
      primary: {
        contrastText: '#ffffff',
        main: '#5664d2',
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c',
      },
    },
    shadows,
    typography,
  };
  // @ts-ignore
  return createTheme(theme, local === LANGUAGE_MAP.zh ? zhCN : enUS);
};
