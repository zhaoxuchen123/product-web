---
layout: doc
---

# sydev - SylixOS 开发命令行工具

sydev 是一个面向 SylixOS 开发环境的命令行工具，自动化工作空间初始化、项目创建、设备管理、编译构建、产物上传及配置管理等开发流程，支持通过模板或 JSON 文件进行批量配置。

- **GitHub**: [SeanPcWoo/sydev](https://github.com/SeanPcWoo/sydev)
- **npm**: `@haawpc/sydev`
- **当前版本**: v0.4.16

## 安装

需要 Node.js 18 或更高版本，以及已安装的 RealEvo-Stream 工具链（`rl`、`rl-workspace`、`rl-project` 命令可用）。

```bash
npm install -g @haawpc/sydev
```

验证安装：

```bash
sydev --version
sydev --help
```

## 核心命令

| 命令 | 说明 |
|------|------|
| `sydev workspace` | 初始化工作空间或验证当前目录状态 |
| `sydev project` | 创建项目或列出已有项目 |
| `sydev device` | 注册目标设备或查看可用设备 |
| `sydev build` | 编译单个或多个项目 |
| `sydev clean` | 清理构建产物 |
| `sydev rebuild` | 清理后重新编译 |
| `sydev upload` | 通过 FTP 将产物部署到设备 |
| `sydev template` | 管理可复用的配置模板 |
| `sydev init` | 从 JSON 配置文件批量初始化 |

## 主要特性

### 配置模板

将工作空间、项目与设备配置存储为模板（位于 `~/.sydev/templates/`），支持从 JSON 导入并跨环境应用，实现开发环境的快速复制。

### 构建模板

通过 `.sydev/Makefile` 中定义的自定义目标，使用下划线前缀标识符（如 `sydev build __demo`）执行特定构建任务。

### 非交互模式

所有命令支持通过配置文件运行，可用于 CI/CD 自动化流水线，无需人工交互。

### ARM64 支持

支持配置 ARM64 页大小，以及选择性编译基础系统组件（libsylixos、libcextern）。

## 工作空间结构

```
workspace/
├── .realevo/          # RealEvo 配置文件
├── .sydev/Makefile    # 构建定义
└── projects/          # 各独立项目（含 .project 与 Makefile）
```

## 系统要求

- Node.js >= 18
- RealEvo-Stream 工具链（`rl`、`rl-workspace`、`rl-project`）
- 构建/清理/上传操作需在有效的工作空间根目录下执行

## 文档导航

- [快速开始](./getting-started) — 5 分钟走通完整开发流程
- [命令参考](./command-reference) — 所有命令的详细参数说明
- [配置文件](./configuration) — JSON 配置格式与模板系统
- [上传部署](./upload-guide) — FTP 上传机制与设备管理
- [CI/CD 集成](./ci-cd) — 自动化流水线集成方案
