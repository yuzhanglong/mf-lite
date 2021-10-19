# Example: Quick Start

最简单的项目 DEMO，开箱即用，全部在本地运行开发。

## Usage

### 基本的开发环境

启动基座应用和微应用：

```shell
yarn start-all
```

进入 `localhost:8080` 查看效果。

### 子应用生成父应用模块共享的类型定义

```shell
cd micro-app

yarn generate
```

接着检查微应用的 types/mf-remotes 下类型定义是否生成，其内容如下：

```typescript
// module name: base_app/shared-utils

declare module 'base_app/shared-utils' {
  export const add: (a: number, b: number) => number;
  export const sayHello: () => void;
  export default add;
  export {};
}
```

### 在子应用中调用父应用暴露出来的模块

```typescript
import { sayHello } from 'base_app/shared-utils';

sayHello() // hello world
```

### 打包

```shell
# 开发环境下打包
yarn build:dev

# 生产环境下打包
yarn build:prod
```
