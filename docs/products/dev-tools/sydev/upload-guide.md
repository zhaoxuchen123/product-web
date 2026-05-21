---
layout: doc
---

# 上传部署指南

sydev 通过 FTP 协议将编译产物部署到 SylixOS 目标设备。本文档详细介绍上传机制、路径映射规则和设备管理。

## 前置条件

1. 已通过 `sydev device add` 注册目标设备
2. 目标设备的 FTP 服务已启动
3. 项目已成功编译，产物文件存在
4. 项目目录中存在 `.reproject` 路径映射文件

## 基本用法

```bash
# 交互式选择项目和设备
sydev upload

# 上传单个项目到指定设备
sydev upload my-app --device my-board

# 上传多个项目（逗号或冒号分隔）
sydev upload my-app,my-lib --device my-board
sydev upload my-app:my-lib --device my-board

# 上传工作空间中的所有项目
sydev upload --all --device my-board

# 静默模式
sydev upload my-app --device my-board --quiet
```

## 设备选择规则

| 场景 | `--device` 参数 | 行为 |
|------|----------------|------|
| 单个项目 | 可省略 | 使用 `.reproject` 中的默认设备 |
| 多个项目 | **必填** | 所有项目上传到同一设备 |
| `--all` 模式 | **必填** | 所有项目上传到同一设备 |

## 路径映射

### .reproject 文件

每个项目目录下的 `.reproject` 文件定义了本地文件与设备远端路径的映射关系。该文件为 XML 格式，由 RealEvo-Stream 自动生成。

### 路径变量

映射路径中支持以下变量替换：

| 变量 | 说明 | 示例 |
|------|------|------|
| `$(WORKSPACE_<project>)` | 指定项目的本地路径 | `$(WORKSPACE_my-app)` → `/home/user/ws/my-app` |
| `$(Output)` | 构建产物输出目录 | `Debug` 或 `Release` |

## FTP 上传流程

sydev 的上传过程如下：

```
1. 读取设备信息
   ├── 优先从 .realevo/devicelist.json 读取
   └── 回退到 .realevo/config.json
2. 建立 FTP 连接
   └── 使用设备配置中的 IP、端口、用户名、密码
3. 解析路径映射
   └── 读取 .reproject 文件，替换路径变量
4. 创建远端目录
   └── 递归创建所需的目录结构
5. 逐文件上传
   └── 按映射关系逐个传输文件，报告进度
6. 清理连接
   └── 无论成功或失败，确保 FTP 连接正确关闭
```

## 设备管理

### 添加设备

```bash
sydev device add \
  --name rk3568 \
  --ip 192.168.1.100 \
  --platforms ARM64_A53 \
  --username root \
  --password root \
  --ftp 21
```

### 查看已有设备

```bash
sydev device list
```

### 设备配置存储

设备信息存储在工作空间的 `.realevo/devicelist.json` 文件中：

```json
[
  {
    "name": "rk3568",
    "ip": "192.168.1.100",
    "platforms": ["ARM64_A53"],
    "username": "root",
    "password": "root",
    "ssh": 22,
    "telnet": 23,
    "ftp": 21,
    "gdb": 1234
  }
]
```

## 常见问题

### 连接超时

确认目标设备 FTP 服务已启动，端口可达：

```bash
# 测试网络连通性
ping 192.168.1.100

# 测试 FTP 端口
telnet 192.168.1.100 21
```

### 上传文件不完整

sydev 采用逐文件上传策略，部分失败不会影响其他文件。检查输出日志中的错误信息，通常是远端目录权限问题。

### 找不到设备

确认已在当前工作空间中注册设备：

```bash
sydev device list
```

如果列表为空，需要先执行 `sydev device add`。
