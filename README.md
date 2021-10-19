<div align="center">
<a href="https://github.com/yuzhanglong/mf-lite">
  <img src="https://user-images.githubusercontent.com/56540811/137176565-c6f240c2-73ee-4b9d-bc18-11b29e4512a4.png" width="150">
</a>
</div>
<br/>

<div align="center">

基于 Webpack 5 Module Federation，优雅且实用的微前端解决方案。

</div>

<div align="center">

[在线 DEMO](https://mf-lite-quick-start-base-app.vercel.app/) | [文档](https://ph3xmz5sya.feishu.cn/docs/doccnGEPiy8D3DJTZw6S05QJW4f)
</div>


## 介绍

**mf-lite** 是一个基于 Webpack 5 Module Federation 来实现模块共享、[qiankun](https://github.com/umijs/qiankun) 来做隔离沙箱的微前端解决方案，它提供以下内容：

- 一个通过命令行快速创建基座应用或者微前端应用的[脚手架](https://github.com/yuzhanglong/mf-lite), 提供项目初始化依赖及开发、构建脚本。[![npm Version](https://img.shields.io/npm/v/@attachments/assets.svg)](https://www.npmjs.com/package/@attachments/assets)

- 一个[核心工具库](https://github.com/yuzhanglong/mf-lite/tree/master/packages/core), 它可以：[![npm Version](https://img.shields.io/npm/v/@mf-lite/core.svg)](https://www.npmjs.com/package/@mf-lite/core)
  - 基于 **Webpack Module Federation** 特性，让微前端架构下的的**库共享**(share library)、甚至**模块共享**(share module) 成为可能，且使用更加优雅、易于维护。
  - 自动生成、处理开发、生产可用的 webpack 的复杂配置项，用户基本上无需直接接触 webpack 的相关配置。
  - 支持生成远程模块的 typescript 类型定义。

- 一个基于 node.js、方便独立开发微应用的 HTTP [请求代理工具](https://github.com/yuzhanglong/attachments/tree/main/packages/proxy), 使微应用的独立开发方式更加优雅。[![npm Version](https://img.shields.io/npm/v/@attachments/proxy.svg)](https://www.npmjs.com/package/@attachments/proxy)


对于用户来说，唯一需要做的就是拉取模板、然后加上一些十分简单的配置，剩下的和平常的开发流程别无二致。

## 特性

📦 **开箱即用**：你只需要执行几行命令即可拉取相应的模板代码并把项目跑起来，包括基座应用和微前端应用，无需处理构建工具的复杂配置。

🤩 **typescript 支持**：模块的生产者和消费者均可自动生成/消费相关的 typescript 类型定义。

🚀 **舒适的开发体验**：开发体验与常规应用一致、完美接入 qiankun 微前端沙箱库、基座和微应用开发都支持热更新，类型定义的生成也不会打断正常的开发流程。

🔨 **独立开发与部署**：基于提供的代理工具，微应用开发者在单独开发微应用时，无需启动基座或者其它微应用。

🌟 **轻量的项目模板**：脚手架生成的初始项目只保留微前端相关的核心依赖，其它第三方库的选型（如 ui 组件库、状态管理库）交由开发者全权管理。

## 快速开始

**安装脚手架工具**

```shell
npm install @mf-lite/cli -g
```

**在交互式命令行中创建项目**

```shell
mf-lite create
```

**安装依赖、执行项目**

```shell
npm install
npm run dev:serve
```

更多信息以及实践方案，请[查看文档](https://ph3xmz5sya.feishu.cn/docs/doccnGEPiy8D3DJTZw6S05QJW4f)

## 案例

[快速开始](https://github.com/yuzhanglong/mf-lite/tree/master/examples/quick-start): 最简单的项目 DEMO，开箱即用，全部在本地运行开发。子应用能够共享基座应用暴露出来的模块或者 npm 包。

[微应用独立开发](https://github.com/yuzhanglong/mf-lite/tree/master/examples/micro-app-only): 单独微应用的开发模式，基于部署在远程的基座开发，微应用基于它运行、消费其依赖。

[远程部署案例](https://github.com/yuzhanglong/mf-lite/tree/master/examples/remote-deploy): 通过配置来实现远程部署，其实现效果就是上文的 [在线 DEMO](https://mf-lite-quick-start-base-app.vercel.app/)。

[多个子应用部署案例](https://github.com/yuzhanglong/mf-lite/tree/master/examples/multiply-micro-app): 一个在同一个页面运行多个微应用的案例。

> TIP: 所有案例都可以在本仓库的 `examples` 目录下找到。

## 它是如何工作的

请参考[这篇文章](https://zhuanlan.zhihu.com/p/422460780)

## License

MIT [@yuzhanglong](https://github.com/yuzhanglong)
