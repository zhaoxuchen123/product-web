---
layout: doc
---

# 配置文件参考

sydev 的所有命令都支持通过 `--config` 参数传入 JSON 配置文件，也支持通过模板系统复用配置。本文档详细说明各类配置文件的格式。

## 配置优先级

当同时存在多种配置来源时，按以下优先级合并：

```
命令行参数 > JSON 配置文件 > 默认值
```

## 工作空间配置

用于 `sydev workspace init --config <file>`。

```json
{
  "cwd": "/home/user/my-workspace",
  "basePath": "/home/user/my-workspace/.realevo/base",
  "version": "default",
  "platforms": ["ARM64_A53", "X86_64"],
  "os": "sylixos",
  "debugLevel": "release",
  "arm64PageShift": 14,
  "baseComponents": ["libsylixos", "openssl", "libcurl"],
  "createBase": true,
  "build": false
}
```

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cwd` | string | 否 | 工作空间路径，默认当前目录 |
| `basePath` | string | 否 | 基础库路径，默认 `${cwd}/.realevo/base` |
| `version` | string | 否 | SylixOS 版本，默认 `default` |
| `platforms` | string[] | **是** | 目标架构列表，至少一个 |
| `os` | string | 否 | `sylixos` 或 `linux`，默认 `sylixos` |
| `debugLevel` | string | 否 | `release` 或 `debug`，默认 `release` |
| `arm64PageShift` | number | 否 | 仅 ARM64 有效：`12`/`14`/`16` |
| `baseComponents` | string[] | 否 | 组件列表，默认 `["libsylixos"]` |
| `createBase` | boolean | 否 | 是否创建基础库目录，默认 `true` |
| `build` | boolean | 否 | 是否立即编译基础库，默认 `false` |

**自定义版本额外字段：**

| 字段 | 适用版本 | 说明 |
|------|---------|------|
| `customRepo` | `custom` | Git 仓库 URL |
| `customBranch` | `custom` | Git 分支名 |
| `researchBranch` | `research` | 研究分支名 |

**校验规则：**

- `cwd` 和 `basePath` 长度至少 1 个字符
- `platforms` 至少包含 1 个有效架构
- `arm64PageShift` 仅在选择了 ARM64 架构时有效
- `baseComponents` 支持逗号、空格、中文逗号分隔

## 项目配置

用于 `sydev project create --config <file>`。

**新建模式：**

```json
{
  "name": "my-app",
  "mode": "create",
  "template": "app",
  "type": "cmake",
  "debugLevel": "release",
  "makeTool": "make"
}
```

**导入模式：**

```json
{
  "name": "my-driver",
  "mode": "import",
  "source": "https://github.com/user/repo.git",
  "branch": "main",
  "makeTool": "make"
}
```

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | **是** | 项目名称，3-50 字符 |
| `mode` | string | **是** | `create` 或 `import` |
| `template` | string | 条件必填 | 新建模式的项目模板 |
| `type` | string | 条件必填 | 新建模式的构建系统类型 |
| `source` | string | 条件必填 | 导入模式的 Git 仓库 URL |
| `branch` | string | 条件必填 | 导入模式的 Git 分支名 |
| `debugLevel` | string | 否 | `release` 或 `debug` |
| `makeTool` | string | 否 | `make` 或 `ninja`，默认 `make` |

## 设备配置

用于 `sydev device add --config <file>`。

```json
{
  "name": "rk3568-board",
  "ip": "192.168.1.100",
  "platforms": ["ARM64_A53"],
  "username": "root",
  "password": "root",
  "ssh": 22,
  "telnet": 23,
  "ftp": 21,
  "gdb": 1234
}
```

**字段说明：**

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `name` | string | **是** | — | 设备名称 |
| `ip` | string | **是** | — | IPv4 地址 |
| `platforms` | string[] | **是** | `["ARM64_GENERIC"]` | 处理器架构 |
| `username` | string | **是** | `root` | 登录用户名 |
| `password` | string | 否 | `root` | 登录密码 |
| `ssh` | number | 否 | `22` | SSH 端口（1-65535） |
| `telnet` | number | 否 | `23` | Telnet 端口 |
| `ftp` | number | 否 | `21` | FTP 端口 |
| `gdb` | number | 否 | `1234` | GDB 调试端口 |

## 完整配置（init 命令）

用于 `sydev init --config <file>`，一次性完成工作空间、项目和设备的批量初始化。

```json
{
  "schemaVersion": 1,
  "workspace": {
    "version": "default",
    "platforms": ["ARM64_A53"],
    "os": "sylixos",
    "debugLevel": "release",
    "baseComponents": ["libsylixos", "openssl"],
    "createBase": true,
    "build": true
  },
  "projects": [
    {
      "name": "my-app",
      "mode": "create",
      "template": "app",
      "type": "cmake"
    },
    {
      "name": "my-driver",
      "mode": "import",
      "source": "https://github.com/user/repo.git",
      "branch": "main"
    }
  ],
  "devices": [
    {
      "name": "dev-board",
      "ip": "192.168.1.100",
      "platforms": ["ARM64_A53"],
      "username": "root",
      "password": "root"
    }
  ]
}
```

**字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `schemaVersion` | number | **是** | 固定为 `1` |
| `workspace` | object | **是** | 工作空间配置 |
| `projects` | array | 否 | 项目配置列表 |
| `devices` | array | 否 | 设备配置列表 |

**包装格式**（模板导出的格式）：

```json
{
  "type": "full",
  "data": {
    "schemaVersion": 1,
    "workspace": { ... },
    "projects": [ ... ],
    "devices": [ ... ]
  }
}
```

如果 JSON 中缺少 `cwd` 或 `basePath`，`init` 命令会在运行时通过交互提示要求输入。

## 模板系统

### 模板存储

模板保存在 `~/.sydev/templates/` 目录中，以 JSON 文件形式存储，带有索引文件管理。

### 模板类型

| 类型 | 说明 | 包含内容 |
|------|------|---------|
| `workspace` | 工作空间模板 | 版本、平台、组件等配置 |
| `project` | 项目模板 | 模式、模板、构建类型等 |
| `device` | 设备模板 | IP、端口、认证信息等 |
| `full` | 完整模板 | 工作空间 + 项目 + 设备 |

### 模板工作流

```bash
# 1. 在已配置好的工作空间中保存模板
sydev template create

# 2. 查看已有模板
sydev template list --type full

# 3. 在新环境中应用模板
cd /path/to/new-workspace
sydev template apply my-arm64-workspace

# 4. 导出模板为 JSON 文件，方便团队共享
sydev template export -o team-config.json

# 5. 团队成员导入模板
sydev template import team-config.json --yes
```

## 工作空间目录结构

```
workspace/
├── .realevo/                    # RealEvo 配置（自动生成）
│   ├── config.json              # 全局配置
│   ├── workspace.json           # 工作空间元数据
│   ├── projects.json            # 项目定义列表
│   ├── devicelist.json          # 设备列表（优先于 config.json）
│   └── base/                    # 基础库安装目录
│       ├── libsylixos/
│       ├── openssl/
│       └── ...
├── .sydev/
│   └── Makefile                 # 构建模板定义
├── project-a/
│   ├── .project                 # Eclipse 项目文件
│   ├── Makefile                 # 构建文件
│   ├── config.mk                # 编译设置（自动同步）
│   ├── .reproject               # 上传路径映射
│   └── src/                     # 源代码
├── project-b/
│   └── ...
└── base/                        # 基础库源码（可选）
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `REALEVO_HOME` | 自定义 RealEvo-Stream 安装路径 |
| `SYDEV_VERSION` | 覆盖 CLI 版本号 |
