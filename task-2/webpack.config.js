const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_env, argv) => {
  const mode = argv.mode || 'development';

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: 'index.mjs',
      path: path.resolve(__dirname, 'dist'),
      module: true,
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
                target: 'es2015',
              },
              module: {
                type: 'es6',
              },
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    target: 'node',
    plugins: [new CleanWebpackPlugin()],
  };
};
