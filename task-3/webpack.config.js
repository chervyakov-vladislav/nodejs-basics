import path from 'node:path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default (_env, argv) => {
  const __dirname = import.meta.dirname;
  const mode = argv.mode || 'development';

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: 'index.js',
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
