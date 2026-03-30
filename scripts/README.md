# Jenkins 版本自动同步说明

本目录提供了将 Jenkins 产品发布流程与产品网站版本展示自动联动的工具脚本。

## 工作原理

```
产品仓库（Jenkins Pipeline）
    ├── 编译 & 测试
    ├── 发布到 Armory
    └── 调用 update_version.py 更新 versions.json
            │
            └── git commit + push → 触发 product-web CI
                        ├── vitepress build
                        └── 部署到服务器（版本 badge 自动更新）
```

网站所有产品页面的版本 badge 均通过 `VersionBadge` 组件动态读取
`docs/public/versions.json`，不再硬编码在页面中。

---

## 版本数据文件

**路径**：`docs/public/versions.json`

每个产品对应一个 key，格式如下：

```json
{
  "nic-driver/dw": {
    "version": "v3.0.19",
    "status": "stable",
    "updated": "2026-03-30"
  },
  "tools/ifethtool": {
    "version": "v1.0.0",
    "status": "stable",
    "updated": "2026-03-30"
  }
}
```

**status 可选值**：

| 值 | 含义 | badge 颜色 |
|----|------|------------|
| `stable` | 稳定版 | 绿色 |
| `beta` | 测试版 | 黄色 |
| `dev` | 开发中 | 蓝色 |

---

## 现有产品 key 列表

| key | 产品 |
|-----|------|
| `nic-driver/dw` | DesignWare GMAC 驱动 |
| `nic-driver/rnp` | 沐创 N10 万兆 |
| `nic-driver/rnp500` | 沐创 N500 万兆 |
| `nic-driver/ngbe` | 网讯 WX1860 千兆 |
| `nic-driver/txgbe` | 网讯 WX1820 万兆 |
| `nic-driver/igb` | Intel i210/i350 |
| `nic-driver/igc` | Intel I225/I226 |
| `nic-driver/i40e` | Intel X710/XL710 |
| `nic-driver/yt6801` | 裕太微 YT6801 |
| `tools/ifethtool` | ifethtool |
| `tools/vndbind` | vndbind |
| `tools/xgro` | xgro |
| `tools/pppd` | pppd |
| `middleware` | 中间件 |

---

## update_version.py 使用方式

### 命令格式

```bash
python3 scripts/update_version.py \
  --product <key> \
  --version <版本号> \
  [--status stable|beta|dev] \
  [--file docs/public/versions.json]
```

### 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `--product` | 是 | 产品 key，见上表 |
| `--version` | 是 | 版本号，如 `v3.0.20` |
| `--status` | 否 | 默认 `stable` |
| `--file` | 否 | 默认 `docs/public/versions.json` |

### 示例

```bash
# 更新 DW 驱动到 v3.0.20
python3 scripts/update_version.py --product nic-driver/dw --version v3.0.20

# 更新 ngbe 到 beta 版
python3 scripts/update_version.py --product nic-driver/ngbe --version v1.3.0-beta --status beta
```

---

## Jenkins Pipeline 接入

在产品仓库的 `Jenkinsfile` 中，发布 Armory 成功后添加以下 stage：

```groovy
stage('Update Product Web') {
  steps {
    script {
      def productKey = 'nic-driver/dw'   // 替换为对应产品 key
      def version    = env.VERSION        // Jenkins 构建时注入的版本号

      sh """
        git clone git@github.com:SeanPcWoo/product-web.git _product_web
        cd _product_web
        python3 scripts/update_version.py \\
          --product ${productKey} \\
          --version ${version}
        git add docs/public/versions.json
        git commit -m "chore: update ${productKey} to ${version}"
        git push
        cd ..
        rm -rf _product_web
      """
    }
  }
}
```

> **注意**：Jenkins agent 需要有访问 `product-web` 仓库的 SSH 密钥权限。

---

## 网站侧组件说明

`VersionBadge` 已全局注册，在任意产品页面直接使用：

```html
<VersionBadge product="nic-driver/dw" />
```

组件在页面加载时 fetch `/versions.json`，自动渲染对应的版本号和状态颜色。
加载前显示占位符 `···`，fetch 失败时静默降级（不显示内容）。

---

## 新增产品时

1. 在 `docs/public/versions.json` 中添加对应 key
2. 在产品页面中使用 `<VersionBadge product="your/key" />`
3. 在 Jenkins Pipeline 中按上述模板添加 stage
