module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    '@babel/transform-runtime',
    [
      './src/packages/i18n-babel-plugin/index.ts',
      {
        intlKeyPrefix: 'Yzl_test'
      },
    ],
  ],
};
