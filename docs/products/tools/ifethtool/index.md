<script setup>
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / ifethtool</div>
    <h1 class="plat-title">ifethtool</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 网卡配置工具</p>
    <VersionBadge product="tools/ifethtool" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">ethtool</span><span class="ps-label">兼容接口</span></div>
    <div class="plat-stat"><span class="ps-val">17</span><span class="ps-label">已实现命令</span></div>
    <div class="plat-stat"><span class="ps-val">CLI</span><span class="ps-label">工具类型</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`ifethtool` 是 SylixOS 下的 `ethtool` 风格命令行工具，用于查询和配置网卡的底层硬件参数。它通过 `SIOCETHTOOL` ioctl 接口与内核兼容层通信，使用习惯与 Linux `ethtool` 保持一致。

目前支持的网卡：

- DW 网卡（`v3.0.20` 及以上版本）

## 安装

从 Armory 获取 `ifethtool` 包并安装：

```bash
armory get ifethtool
```

## 快速上手

```bash
# 查询网卡链路状态
ifethtool en0

# 查询驱动信息
ifethtool -i en0

# 查询所有 feature/offload 开关
ifethtool -k en0

# 关闭 TSO
ifethtool -K en0 tso off

# 查询中断合并参数
ifethtool -c en0

# 查询收发队列深度
ifethtool -g en0

# 查询驱动统计
ifethtool -S en0
```

## 文档

- [命令参考](./command-reference) — 所有命令的参数、输出字段与 ioctl 说明
- [应用指南](./application-guide) — 典型使用场景与操作步骤
- [驱动接入](./driver-integration) — 驱动如何通过 `ethtool_ops` 接入 ifethtool

## 支持的命令

| 命令 | 说明 |
|------|------|
| `ifethtool IFNAME` | 查询链路设置 |
| `-i` | 查询驱动信息 |
| `-a` / `-A` | 查询/设置 Pause 参数 |
| `-k` / `-K` | 查询/设置 feature/offload |
| `-g` / `-G` | 查询/设置 ring 深度 |
| `-c` / `-C` | 查询/设置中断合并参数 |
| `-l` / `-L` | 查询/设置 channel 数 |
| `-S` | 查询驱动统计 |
| `-r` | 重新触发自动协商 |
| `-s` | 设置链路参数 |
| `-h` / `-V` | 帮助 / 版本 |

## 最新更新

<ChangelogEntry version="1.0.0" date="2025-10-27" type="minor">

- 初始版本发布
- 支持 17 个 ethtool 兼容命令
- 支持 DW 网卡（v3.0.20+）

</ChangelogEntry>

<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
