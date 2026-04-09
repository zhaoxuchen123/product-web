---
layout: doc
---

# 快速开始

本指南帮助你在 5 分钟内完成 sydev 的安装，并走通「初始化工作空间 → 创建项目 → 编译 → 上传到设备」的完整开发流程。

## 环境要求

| 依赖 | 最低版本 | 说明 |
|------|---------|------|
| Node.js | 18+ | 推荐使用 LTS 版本 |
| RealEvo-Stream | — | 需要 `rl`、`rl-workspace`、`rl-project` 命令可用 |

sydev 会自动在以下路径搜索 RealEvo-Stream 安装：

- `$REALEVO_HOME` 环境变量
- `/opt/acoinfo/realevo-stream`
- `/opt/realevo`
- `~/realevo`
- `~/.realevo`

## 安装

```bash
npm install -g @haawpc/sydev
```

验证安装成功：

```bash
sydev --version
sydev --help
```

## 第一步：初始化工作空间

```bash
mkdir my-workspace && cd my-workspace
sydev workspace init
```

交互式引导会询问以下内容：

1. **目标平台** — 选择处理器架构（如 `ARM64_A53`、`X86_64`）
2. **SylixOS 版本** — 默认使用 `default`（LTS）
3. **基础组件** — 至少包含 `libsylixos`，可按需勾选 `openssl`、`libcurl` 等
4. **是否立即编译基础库** — 首次建议选是

也可以通过命令行参数跳过交互：

```bash
sydev workspace init \
  --platforms ARM64_A53 \
  --version default \
  --base-components "libsylixos,openssl" \
  --build
```

初始化完成后，工作空间结构如下：

```
my-workspace/
├── .realevo/           # RealEvo 配置
│   ├── config.json
│   ├── workspace.json
│   ├── projects.json
│   └── base/           # 基础库
├── .sydev/
│   └── Makefile        # 构建模板定义
└── (项目目录将在下一步创建)
```

## 第二步：创建项目

```bash
sydev project create
```

交互引导会询问：

1. **模式** — `create`（新建）或 `import`（导入已有 Git 仓库）
2. **项目名称** — 3-50 字符
3. **项目模板** — `app`、`lib`、`ko` 等
4. **构建系统** — `cmake`、`automake`、`realevo` 等

快速创建一个 CMake 应用：

```bash
sydev project create \
  --mode create \
  --name my-app \
  --template app \
  --type cmake
```

或从 Git 仓库导入：

```bash
sydev project create \
  --mode import \
  --name my-driver \
  --source https://github.com/user/repo.git \
  --branch main
```

## 第三步：编译

```bash
# 交互选择要编译的项目
sydev build

# 直接编译指定项目
sydev build my-app
```

编译过程会实时输出构建日志。如果遇到错误，sydev 会自动提取并高亮关键错误行。

::: tip 构建模板
如果在 `.sydev/Makefile` 中定义了自定义目标（以 `__` 前缀），可以直接调用：
```bash
sydev build __demo
```
:::

## 第四步：添加设备

```bash
sydev device add
```

需要填写设备的网络信息：

```bash
sydev device add \
  --name my-board \
  --ip 192.168.1.100 \
  --platforms ARM64_A53 \
  --username root \
  --password root
```

## 第五步：上传部署

```bash
# 交互选择项目和设备
sydev upload

# 上传指定项目到指定设备
sydev upload my-app --device my-board

# 上传所有项目
sydev upload --all --device my-board
```

上传通过 FTP 协议完成，sydev 会自动读取项目的 `.reproject` 文件确定远端路径映射。

## 完整流程一览

```bash
# 1. 安装
npm install -g @haawpc/sydev

# 2. 初始化
mkdir project && cd project
sydev workspace init --platforms ARM64_A53 --build

# 3. 创建项目
sydev project create --mode create --name hello --template app --type cmake

# 4. 编译
sydev build hello

# 5. 添加设备
sydev device add --name board --ip 192.168.1.100 --platforms ARM64_A53

# 6. 部署
sydev upload hello --device board
```

## 下一步

- [命令参考](./command-reference) — 查看所有命令的完整参数说明
- [配置文件](./configuration) — 了解 JSON 配置格式与模板系统
- [上传部署](./upload-guide) — 深入理解 FTP 上传与路径映射
- [CI/CD 集成](./ci-cd) — 在自动化流水线中使用 sydev
