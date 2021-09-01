import * as fs from 'fs-extra';

import * as path from 'path';

export const getExposes = () => {
  const base = path.dirname(require.resolve('@material-ui/core'));
  const files = fs.readdirSync(base);
  const cmpNames = files.filter(res => res.match(/^[A-Z]/));
  const exposes = cmpNames.map(res => {
    return {
      [`./@material-ui/core/${res}`]: path.resolve(base, res),
    };
  });

  return {
    exposes,
    cmpNames,
  };
};
