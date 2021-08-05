console.log(process.env.NODE_ENV);

module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    '@babel/transform-runtime',
  ],
  env: {
    production: {
      plugins: [
        [
          '@attachments/i18n-babel-plugin',
          {
            intlKeyPrefix: 'Yzl_test',
            compressPrefix: 'base',
          },
        ],
      ],
    },
  },
};
