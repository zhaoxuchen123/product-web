<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / xgro</div>
    <h1 class="plat-title">xgro</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 软件 GRO 模块</p>
    <VersionBadge product="tools/xgro" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">GRO</span><span class="ps-label">接收卸载</span></div>
    <div class="plat-stat"><span class="ps-val">64</span><span class="ps-label">并发流</span></div>
    <div class="plat-stat"><span class="ps-val">TCP/UDP</span><span class="ps-label">协议支持</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`xgro` 是专为 SylixOS 设计的高性能软件 GRO（Generic Receive Offload，通用接收卸载）内核模块。它在数据包进入协议栈之前，将同一流的多个小包聚合为大包，显著降低高速网络下的 CPU 占用和中断处理开销。

**核心特性：**
- Cache 对齐关键数据结构，避免多核伪共享
- Jenkins 类哈希算法，最小化流表碰撞
- 无锁快慢路径，减少自旋锁竞争
- 支持 TCP/IPv4 和 UDP/IPv4
- 单网卡最多 64 个并发流（可配置）

## 使用方法

模块加载后在 Shell 中注册 `xgro` 命令：

```bash
xgro <ifname> [on|off] [cnt <val>] [size <val>] [interval <val>] [timeout <val>]
xgro show [ifname]
```

### 开启 GRO

```bash
xgro en1 on
```

### 查看状态

```bash
xgro show en1
```

输出示例：

```
==============================================================
 Interface: en1        (Netdev Index: 1)
==============================================================
 [ Configuration ]
   GRO State            : Enabled
   Max Flows            : 64
   Max Merge Count      : 64 packets
   Max Merge Size       : 65535 bytes
   Flow Timeout         : 20 ms
   Timer Interval       : 20 ms

 [ Statistics ]
   Active Flows         : 5
   RX Packets           : 125890
   Merged Packets       : 98000
==============================================================
```

### 性能调优

```bash
# 提升吞吐量：增大聚合数量和大小
xgro en1 cnt 64 size 65535

# 降低延迟：减小超时时间
xgro en1 timeout 10
```

## 配置参数

| 参数 | 关键字 | 默认值 | 说明 |
|------|--------|--------|------|
| 最大聚合数量 | `cnt` | 32 | 单个聚合链最大包数 |
| 最大聚合大小 | `size` | 32KB | 聚合后最大字节数 |
| 流超时时间 | `timeout` | 20ms | 超时后立即上送协议栈 |
| 定时器间隔 | `interval` | 20ms | 检查过期流的频率 |

## 故障排查

**TCP 接收速度异常**
通过 `xgro en1 cnt 16` 适当降低聚合包数，或使用 `iftcpwnd` 调整 TCP 窗口大小。

**哈希碰撞过高**
在 `xgro show` 中 `Hash Collisions` 持续升高时，增大 `GRO_MAX_FLOWS`（必须为 2 的幂）并重新编译。

## 最新更新

<ChangelogEntry version="2.0.0" date="2026-01-19" type="major">

- 重构为 2.0.0 版本
- 新增 Cache 对齐优化，避免多核伪共享
- 优化哈希算法，减少流表碰撞

</ChangelogEntry>

<ChangelogEntry version="2.0.0" date="2026-03-12" type="patch">

- 修复以太网头长度比较问题

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
