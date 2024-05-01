import type { StorybookConfig } from '@storybook/react-webpack5';
import { run } from 'node:test';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  // babel: async (options) => ({
  //   ...options,
  //   presets: [...options.presets, require.resolve('@babel/preset-react')],
  //   plugins: [
  //     ...options.plugins,
  //     // other plugins...
  //   ],
  // }),
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                '@babel/preset-react',
                { flow: false, typescript: true, runtime: 'automatic' },
              ],
            ],
          },
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
export default config;
