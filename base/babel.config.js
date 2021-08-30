module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      ['@babel/preset-env'],
      // Enable development transform of React with new automatic runtime
      [
        '@babel/preset-react',
        {
          development: !api.env('production'),
          runtime: 'automatic',
        },
      ],
      ['@babel/preset-typescript'],
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    plugins: [
      ['@babel/plugin-transform-runtime'],
    ].filter(Boolean),
  };
};
