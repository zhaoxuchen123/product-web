---
layout: doc
---

# 命令参考

sydev 提供 9 个核心命令，覆盖 SylixOS 开发的完整流程。所有命令均支持 `--help` 查看帮助。

## workspace — 工作空间管理

### `sydev workspace init`

初始化 SylixOS 工作空间，配置基础库与编译环境。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--cwd` | 路径 | 当前目录 | 工作空间根目录 |
| `--base-path` | 路径 | `${cwd}/.realevo/base` | 基础库安装路径 |
| `--version` | 枚举 | `default` | SylixOS 版本（见下表） |
| `--platforms` | 字符串列表 | — | **必填**，目标处理器架构 |
| `--os` | 枚举 | `sylixos` | 操作系统类型：`sylixos` \| `linux` |
| `--debug-level` | 枚举 | `release` | 调试级别：`release` \| `debug` |
| `--arm64-page-shift` | 枚举 | — | ARM64 页大小位移：`12`(4K) \| `14`(16K) \| `16`(64K) |
| `--base-components` | 字符串列表 | `["libsylixos"]` | 基础组件列表 |
| `--custom-repo` | URL | — | 自定义版本的仓库地址 |
| `--custom-branch` | 字符串 | — | 自定义版本的分支名 |
| `--research-branch` | 字符串 | — | 研究版本的分支名 |
| `--create-base` | 标志 | 启用 | 创建基础库目录 |
| `--no-create-base` | 标志 | — | 跳过基础库目录创建 |
| `--build` | 标志 | 禁用 | 初始化后立即编译基础库 |
| `--config` | 文件路径 | — | 从 JSON 文件读取配置 |

**SylixOS 版本选项：**

| 值 | 说明 |
|----|------|
| `default` | 标准 LTS 版本 |
| `ecs_3.6.5` | ECS 变体 |
| `lts_3.6.5` | LTS 标准版 |
| `lts_3.6.5_compiled` | 预编译 LTS 版 |
| `research` | 研究分支（需指定 `--research-branch`） |
| `custom` | 自定义仓库（需指定 `--custom-repo` 和 `--custom-branch`） |

**示例：**

```bash
# 交互式初始化
sydev workspace init

# 指定平台和版本
sydev workspace init --platforms ARM64_A53,ARM64_A72 --version lts_3.6.5

# ARM64 自定义页大小
sydev workspace init --platforms ARM64_A53 --arm64-page-shift 16

# 使用自定义仓库
sydev workspace init \
  --platforms ARM64_A53 \
  --version custom \
  --custom-repo https://git.example.com/sylixos.git \
  --custom-branch feature-branch

# 从配置文件初始化
sydev workspace init --config workspace.json
```

### `sydev workspace status`

检查当前目录是否为有效的 SylixOS 工作空间并显示其状态信息。

```bash
sydev workspace status
```

---

## project — 项目管理

### `sydev project create`

在当前工作空间中创建或导入项目。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--mode` | 枚举 | — | `import`（导入）\| `create`（新建） |
| `--name` | 字符串 | — | **必填**，项目名称（3-50 字符） |
| `--source` | URL | — | 导入模式的 Git 仓库地址 |
| `--branch` | 字符串 | — | 导入模式的 Git 分支名 |
| `--template` | 枚举 | — | 新建模式的项目模板 |
| `--type` | 枚举 | — | 新建模式的构建系统类型 |
| `--debug-level` | 枚举 | — | 调试级别：`debug` \| `release` |
| `--make-tool` | 枚举 | `make` | 构建工具：`make` \| `ninja` |
| `--config` | 文件路径 | — | 从 JSON 文件读取配置 |

**项目模板：**

| 模板 | 说明 |
|------|------|
| `app` | 应用程序 |
| `lib` | 动态库 |
| `common` | 通用组件 |
| `ko` | 内核模块 |
| `python_native_lib` | Python 原生库 |
| `uorb_pubsub` | UORB 发布/订阅 |
| `vsoa_pubsub` | VSOA 发布/订阅 |
| `fast_dds_pubsub` | Fast DDS 发布/订阅 |

**构建系统类型：**

| 类型 | 说明 |
|------|------|
| `cmake` | CMake 构建 |
| `automake` | Automake 构建 |
| `realevo` | RealEvo 原生构建 |
| `ros2` | ROS2 构建 |
| `python` | Python 构建 |
| `cython` | Cython 构建 |
| `go` | Go 构建 |
| `javascript` | JavaScript 构建 |

**示例：**

```bash
# 新建 CMake 应用
sydev project create --mode create --name my-app --template app --type cmake

# 新建内核模块
sydev project create --mode create --name my-ko --template ko --type realevo

# 从 Git 仓库导入
sydev project create --mode import --name driver --source https://github.com/user/repo.git --branch main

# 使用 Ninja 构建工具
sydev project create --mode create --name fast-app --template app --type cmake --make-tool ninja
```

### `sydev project list`

列出当前工作空间中的所有项目。

```bash
sydev project list
```

项目检测规则：子目录中同时包含 `.project` 和 `Makefile` 文件的即视为项目。以下目录会被自动排除：`Debug`、`Release`、`debug`、`release`、`node_modules`、`dist`、隐藏目录。

---

## device — 设备管理

### `sydev device add`

注册一个目标设备，用于后续的上传部署操作。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--name` | 字符串 | — | **必填**，设备名称 |
| `--ip` | IPv4 地址 | — | **必填**，设备 IP 地址 |
| `--platforms` | 字符串列表 | `["ARM64_GENERIC"]` | 设备处理器架构 |
| `--username` | 字符串 | `root` | 登录用户名 |
| `--password` | 字符串 | `root` | 登录密码 |
| `--ssh` | 端口 | `22` | SSH 端口 |
| `--telnet` | 端口 | `23` | Telnet 端口 |
| `--ftp` | 端口 | `21` | FTP 端口 |
| `--gdb` | 端口 | `1234` | GDB 调试端口 |
| `--config` | 文件路径 | — | 从 JSON 文件读取配置 |

**示例：**

```bash
# 交互式添加
sydev device add

# 完整命令行参数
sydev device add \
  --name rk3568-board \
  --ip 192.168.1.100 \
  --platforms ARM64_A53 \
  --username root \
  --password root \
  --ftp 21 \
  --gdb 1234

# 从配置文件添加
sydev device add --config device.json
```

### `sydev device list`

列出所有已配置的目标设备。

```bash
sydev device list
```

---

## build — 编译构建

### `sydev build [project]`

编译指定项目或交互选择要编译的项目。

| 参数 | 类型 | 说明 |
|------|------|------|
| `[project]` | 字符串 | 可选，项目名称 |
| `--quiet` | 标志 | 抑制实时输出 |
| `--board` | CSV | BSP 板级选择（非交互模式） |
| `-- [args]` | 透传 | 透传参数给底层 `rl-build` 或 `make` |

**行为说明：**

- 不指定项目名：进入交互式多选界面
- 指定项目名：直接编译该项目
- 编译 `base` 目录：自动使用 `make` 而非 `rl-build`
- 构建模板目标（`__` 前缀）：从 `.sydev/Makefile` 读取自定义目标

**自动处理：**

- 编译前自动同步 `config.mk` 中的 `SYLIXOS_BASE_PATH`
- 编译基础库时自动应用 jobserver 补丁
- 自动执行 `dos2unix` 行尾规范化

**示例：**

```bash
# 交互选择编译
sydev build

# 编译指定项目
sydev build my-app

# 静默模式
sydev build my-app --quiet

# 透传 make 参数（如并行编译）
sydev build my-app -- -j8

# 编译基础库
sydev build base

# 使用构建模板
sydev build __demo
```

### `sydev build init`

初始化或重新生成 `.sydev/Makefile` 构建模板文件。

| 参数 | 说明 |
|------|------|
| `--default` | 强制重新生成，覆盖已有文件 |

```bash
sydev build init
sydev build init --default
```

---

## clean — 清理构建

### `sydev clean [project]`

清理指定项目的构建产物。

| 参数 | 类型 | 说明 |
|------|------|------|
| `[project]` | 字符串 | 可选，项目名称 |
| `--quiet` | 标志 | 抑制输出 |

```bash
# 交互选择
sydev clean

# 清理指定项目
sydev clean my-app

# 清理基础库
sydev clean base
```

---

## rebuild — 重新编译

### `sydev rebuild [project]`

等价于先执行 `clean` 再执行 `build`。

| 参数 | 类型 | 说明 |
|------|------|------|
| `[project]` | 字符串 | 可选，项目名称 |
| `--quiet` | 标志 | 抑制输出 |
| `-- [args]` | 透传 | 透传参数给底层构建系统 |

```bash
sydev rebuild my-app
sydev rebuild my-app -- -j4
```

---

## upload — 上传部署

### `sydev upload [projects]`

将编译产物通过 FTP 上传到目标设备。

| 参数 | 类型 | 说明 |
|------|------|------|
| `[projects]` | CSV/冒号分隔 | 可选，项目名称列表 |
| `--device` | 字符串 | 目标设备名称 |
| `--all` | 标志 | 上传所有项目（需配合 `--device`） |
| `--quiet` | 标志 | 抑制输出 |

**规则：**

- 单个项目：可省略 `--device`（使用 `.reproject` 中的默认设备）
- 多个项目：必须指定 `--device`
- `--all`：必须指定 `--device`

**示例：**

```bash
# 交互选择
sydev upload

# 上传单个项目
sydev upload my-app --device my-board

# 上传多个项目
sydev upload my-app,my-lib --device my-board

# 上传所有项目
sydev upload --all --device my-board
```

详细说明见 [上传部署指南](./upload-guide)。

---

## template — 模板管理

管理可复用的配置模板，存储在 `~/.sydev/templates/` 目录。

### `sydev template create`

将当前工作空间的配置保存为模板。

```bash
sydev template create
```

### `sydev template list`

列出已保存的模板。

| 参数 | 类型 | 说明 |
|------|------|------|
| `-t, --type` | 枚举 | 过滤类型：`workspace` \| `project` \| `device` \| `full` |

```bash
sydev template list
sydev template list --type workspace
```

### `sydev template show <id>`

查看指定模板的详细内容。

```bash
sydev template show my-arm64-workspace
```

### `sydev template apply <source>`

将模板应用到当前或指定目录。

| 参数 | 类型 | 说明 |
|------|------|------|
| `<source>` | 字符串 | **必填**，模板 ID 或文件路径 |
| `--cwd` | 路径 | 目标工作空间目录 |
| `--base-path` | 路径 | 基础库路径 |
| `-y, --yes` | 标志 | 跳过确认提示 |

```bash
sydev template apply my-arm64-workspace
sydev template apply my-template --cwd /path/to/workspace --yes
```

### `sydev template delete <id>`

删除指定模板。

```bash
sydev template delete my-old-template
```

### `sydev template export`

将模板导出为 JSON 文件。

| 参数 | 类型 | 说明 |
|------|------|------|
| `-o, --output` | 文件名 | 输出文件名 |
| `-d, --dir` | 路径 | 输出目录 |

```bash
sydev template export
sydev template export -o my-config.json -d ./exports/
```

### `sydev template import <file>`

从 JSON 文件导入模板。

| 参数 | 类型 | 说明 |
|------|------|------|
| `<file>` | 文件路径 | **必填**，JSON 文件路径 |
| `-y, --yes` | 标志 | 跳过确认提示 |

```bash
sydev template import ./my-config.json
sydev template import ./shared-config.json --yes
```

---

## init — 批量初始化

### `sydev init`

从 JSON 配置文件一次性初始化工作空间、创建项目和注册设备。

| 参数 | 类型 | 说明 |
|------|------|------|
| `--config` | 文件路径 | **必填**，JSON 配置文件路径 |

```bash
sydev init --config full-setup.json
```

配置文件格式见 [配置文件参考](./configuration)。

---

## 支持的处理器架构

sydev 支持 **59 种**处理器架构：

### ARM (32-bit)

`ARM_926H` `ARM_926S` `ARM_1176JZF` `ARM_A8` `ARM_A9` `ARM_A17` `ARM_A53` `ARM_A55` `ARM_A57` `ARM_A72` 等

### ARM64

`ARM64_A53` `ARM64_A55` `ARM64_A57` `ARM64_A72` `ARM64_GENERIC`

### x86

`X86_PENTIUM` `X86_PENTIUM_SOFT` `X86_64`

### MIPS

`MIPS_32` `MIPS_64` 及其他 6 个变体

### PowerPC

`PPC_750` `PPC_464FP` 及其他 12 个变体

### 其他

`SPARC_LEON3` `SPARC_V8` `RISCV` `LOONGARCH` `CSKY` `SW6B` 等

---

## 可选基础组件

除必选的 `libsylixos` 外，还可按需选择以下 23 个组件：

| 组件 | 说明 |
|------|------|
| `libcurl` | HTTP 客户端库 |
| `openssl` | SSL/TLS 加密库 |
| `openssl-dev` | OpenSSL 开发头文件 |
| `openssh` | SSH 协议实现 |
| `lua` | Lua 脚本引擎 |
| `sqlite3` | 嵌入式数据库 |
| `zlib` | 数据压缩库 |
| `libxml2` | XML 解析库 |
| `libcrypt` | 加密工具库 |
| `libsctp` | SCTP 协议库 |
| `libftp` | FTP 客户端库 |
| `libgtest` | Google 测试框架 |
| `libpcre` | 正则表达式库 |
| `libjson-c` | JSON 解析库 |
| `libedit` | 命令行编辑库 |
| `libgd` | 图形绘制库 |
| `libpng` | PNG 图像库 |
| `libjpeg` | JPEG 图像库 |
| `freetype` | 字体渲染库 |
| `neon` | WebDAV/HTTP 客户端库 |
| `libcextern` | C 扩展库 |
| 其他 | 根据版本可能有额外组件 |
