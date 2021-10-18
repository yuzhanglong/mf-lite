#!/usr/bin/env ts-node

import { program } from 'commander';
import { loadTsConfigFile } from '@attachments/utils/lib/node';
import * as path from 'path';
import ncu from 'npm-check-updates';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { getMicroAppWebpackConfig, MicroAppWebpackConfigOptions } from './get-micro-app-webpack-config';
import { webpackBuild, webpackServe } from './webpack-command';
import { MicroAppConfig } from './micro-fe-app-config';
import { generateMfExposeDeclaration } from './generate-mf-expose-declaration';

const APP_TYPES: (MicroAppWebpackConfigOptions['type'])[] = ['micro-app', 'base-app'];

const parseMicroAppBaseOptions = async (opt: any, isBuildMode: boolean) => {
  const { appConfigPath, port, appType, analyze } = opt;
  if (!APP_TYPES.includes(appType)) {
    throw new Error('[mf-lite] app-type should be one of base-app or micro-app!');
  }
  const appConfig = await loadTsConfigFile(path.resolve(process.cwd(), appConfigPath));

  return {
    appConfig: appConfig,
    // 在 build 模式下不起作用
    port: port || 8080,
    type: appType,
    isBuildMode: isBuildMode,
    isAnalyzeMode: analyze,
  } as MicroAppWebpackConfigOptions;
};


// 版本信息
program
  .version(`attachments ${require('../../package.json').version}`);

// server 服务
program
  .command('serve')
  .description('serve project by webpack-dev-server in development mode')
  .option('--port <port>', 'dev-server port')
  .option('--app-config-path <config>', 'app configuration file path', 'app-config.ts')
  .option('--analyze <analyze>', 'open webpack-bundle-analyzer', false)
  .requiredOption('--app-type <type>', 'set the app type, micro-app or base-app')
  .action(
    async (opt) => {
      const config = await parseMicroAppBaseOptions(opt, false);
      const microAppWebpackConfig = getMicroAppWebpackConfig(config);
      await webpackServe(microAppWebpackConfig);
    },
  );

// 构建服务
program
  .command('build')
  .description('build your app')
  .option('--app-config-path <config>', 'app configuration file path', 'app-config.ts')
  .option('--analyze <analyze>', 'open webpack-bundle-analyzer', false)
  .requiredOption('--app-type <type>', 'set the app type, micro-app or base-app')
  .action(
    async (opt) => {
      const config = await parseMicroAppBaseOptions(opt, true);

      const microAppWebpackConfig = getMicroAppWebpackConfig(config);

      await webpackBuild(microAppWebpackConfig);
    },
  );

// 类型定义生成器
program
  .command('generate')
  .description('generate remote ts declarations for your app')
  .option('--app-config-path <config>', 'app configuration file path', 'app-config.ts')
  .action(
    async (opt) => {
      const { appConfigPath } = opt;
      const appConfig = await loadTsConfigFile(path.resolve(process.cwd(), appConfigPath));
      await generateMfExposeDeclaration(appConfig as MicroAppConfig);
    },
  );


// 脚手架包升级
program
  .command('upgrade')
  .description('upgrade mf-lite to newest version')
  .action(
    async () => {
      console.log('[mf-lite] upgrading your mf-lite toolkits dependencies...');

      const DEPS_TO_UPGRADE = [
        '@attachments/proxy',
        '@attachments/module-federation-toolkits',
        '@attachments/utils',
      ];

      const res = await ncu.run({
        packageFile: path.resolve(process.cwd(), 'package.json'),
        upgrade: false,
        filter: DEPS_TO_UPGRADE,
      });

      const entries = Object.entries(res);

      // 相关依赖没有需要更新的
      if (!entries || entries.length === 0) {
        console.log('\n[mf-lite] mf-lite is already the latest version~');
        return;
      }

      for (const [k, v] of entries) {
        console.log(`${k} => ${chalk.blue(v)}`);
      }

      const userAnswers = await inquirer.prompt(
        [
          {
            type: 'confirm',
            message: '[mf-lite] There is a new version of mf-lite, the dependencies information is listed above, are you sure you want to update it?',
            name: 'shouldUpgrade',
            default: false,
          },
        ],
      );

      if (userAnswers) {
        await ncu.run({
          packageFile: path.resolve(process.cwd(), 'package.json'),
          upgrade: true,
          filter: DEPS_TO_UPGRADE,
        });
        console.log('[mf-lite] package.json is updated successfully, please run `yarn install` or `npm install` to upgrade your dependencies!');
      }
    },
  );

program.parse(process.argv);
