---
layout: doc
---

# CI/CD 集成

sydev 的所有命令都支持非交互模式，可直接集成到 CI/CD 流水线中。当提供了足够的命令行参数或配置文件时，sydev 会自动跳过交互式提示。

## 非交互模式原则

- **参数完整** → 自动静默执行，无需人工交互
- **参数不足** → 回退到交互式提示（CI 环境中会导致挂起）
- `--config` → 从 JSON 文件读取所有参数
- `--quiet` → 抑制实时构建输出
- `-y, --yes` → 跳过确认提示（模板命令）

## 完整配置文件方式

最推荐的 CI/CD 集成方式是使用一个完整的 JSON 配置文件：

```json
{
  "schemaVersion": 1,
  "workspace": {
    "cwd": "/ci/workspace",
    "basePath": "/ci/workspace/.realevo/base",
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
      "name": "firmware",
      "mode": "import",
      "source": "https://github.com/org/firmware.git",
      "branch": "main",
      "makeTool": "make"
    }
  ],
  "devices": [
    {
      "name": "test-board",
      "ip": "192.168.1.200",
      "platforms": ["ARM64_A53"],
      "username": "root",
      "password": "root"
    }
  ]
}
```

## 流水线脚本示例

### 基础流水线

```bash
#!/bin/bash
set -e

# 安装 sydev
npm install -g @haawpc/sydev

# 初始化完整环境（工作空间 + 项目 + 设备）
sydev init --config ci-config.json

# 编译
sydev build firmware --quiet

# 上传到测试设备
sydev upload firmware --device test-board --quiet
```

### 分步骤流水线

```bash
#!/bin/bash
set -e

# 1. 初始化工作空间
sydev workspace init \
  --cwd /ci/workspace \
  --platforms ARM64_A53 \
  --version default \
  --base-components "libsylixos,openssl" \
  --build

# 2. 导入项目
cd /ci/workspace
sydev project create \
  --mode import \
  --name firmware \
  --source https://github.com/org/firmware.git \
  --branch ${CI_COMMIT_BRANCH:-main}

# 3. 编译项目
sydev build firmware --quiet

# 4. 注册设备并上传
sydev device add \
  --name test-board \
  --ip ${DEVICE_IP:-192.168.1.200} \
  --platforms ARM64_A53 \
  --username root \
  --password root

sydev upload firmware --device test-board --quiet
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any

    environment {
        DEVICE_IP = '192.168.1.200'
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm install -g @haawpc/sydev'
            }
        }

        stage('Init') {
            steps {
                sh 'sydev init --config ci-config.json'
            }
        }

        stage('Build') {
            steps {
                sh 'sydev build firmware --quiet'
            }
        }

        stage('Deploy') {
            steps {
                sh 'sydev upload firmware --device test-board --quiet'
            }
        }
    }

    post {
        failure {
            echo 'Build or deploy failed'
        }
    }
}
```

### GitHub Actions

```yaml
name: Build & Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install sydev
        run: npm install -g @haawpc/sydev

      - name: Initialize workspace
        run: sydev init --config ci-config.json

      - name: Build
        run: sydev build firmware --quiet

      - name: Upload to device
        if: github.ref == 'refs/heads/main'
        run: sydev upload firmware --device test-board --quiet
```

## 模板在 CI/CD 中的应用

可以先在本地创建好模板，导出为 JSON 后纳入版本管理：

```bash
# 本地：导出当前环境配置
sydev template export -o ci-config.json

# 将 ci-config.json 提交到仓库

# CI 中：使用模板初始化
sydev template import ci-config.json --yes
sydev template apply my-workspace --cwd /ci/workspace --yes
```

## 注意事项

- CI 环境需预装 RealEvo-Stream 工具链，确保 `rl`、`rl-workspace` 等命令可用
- 使用 `--quiet` 减少日志输出量，避免日志文件过大
- 设备 IP 和密码建议通过环境变量注入，避免硬编码到配置文件中
- `sydev init` 是 CI 场景的首选命令，一次调用完成全部初始化
