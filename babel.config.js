module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    '@babel/transform-runtime',
    [
      '@attachments/i18n-babel-plugin',
      {
        intlKeyPrefix: 'Yzl_test',
        compressPrefix: 'base',
      },
    ],
  ],
};
