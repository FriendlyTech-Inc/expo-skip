// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './',
              'hooks': './hooks',
            },
            extensions: [
              '.ios.ts',
              '.android.ts',
              '.ts',
              '.ios.tsx',
              '.android.tsx',
              '.tsx',
              '.jsx',
              '.js',
              '.json',
            ],
          },
        ],
      ],
    };
  };