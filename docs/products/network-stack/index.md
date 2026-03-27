---
layout: page
---

<script setup>
import { Network } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ProductPageHero
  title="网络协议栈"
  desc="轻量级 TCP/IP 协议栈，支持 IPv4/IPv6 双栈，针对资源受限嵌入式环境深度优化，POSIX Socket 兼容接口。"
  :icon="Network"
  tag="稳定版"
  version="3.1.0"
  updated="2026-01-20"
  startLink="./getting-started"
  changelogLink="./changelog"
  :stats="[
    { value: '<64KB', label: '最小内存' },
    { value: '10G', label: '线速吞吐' },
    { value: 'IPv4/6', label: '双栈支持' },
  ]"
  :features="[
    'POSIX BSD Socket 兼容，应用移植成本低',
    'TCP、UDP、ICMP、ARP 完整实现',
    'DHCP / DHCPv6 / DNS / mDNS 内置',
    '多网口同时工作，支持路由表管理',
  ]"
/>

<div class="pd-body">

## 产品概述

网络协议栈是一套面向嵌入式场景优化的轻量级 TCP/IP 协议栈，支持 IPv4/IPv6 双栈，在保证标准协议兼容性的同时将内存占用和 CPU 开销压缩到极低水平。

## 协议支持矩阵

| 协议 | 版本 | 状态 |
|---|---|---|
| TCP | IPv4/IPv6 | ✅ 稳定 |
| UDP | IPv4/IPv6 | ✅ 稳定 |
| ICMP / ICMPv6 | — | ✅ 稳定 |
| DHCP Client | v4 | ✅ 稳定 |
| DHCPv6 Client | v6 | ✅ 稳定 |
| DNS Client | — | ✅ 稳定 |
| mDNS | — | 🚧 开发中 |

## 最新更新

<ChangelogEntry version="3.1.0" date="2026-01-20" type="minor">

- 新增 DHCPv6 客户端支持
- TCP 拥塞控制算法新增 CUBIC 选项
- 优化 IPv6 路由查找性能，减少 30% 时延

</ChangelogEntry>

[查看完整更新日志 →](./changelog)

</div>

<style>
.pd-body { max-width: 900px; margin: 0 auto; padding: 0 1.5rem 4rem; }
.pd-body h2 { font-size: 1.3rem; font-weight: 700; margin: 2rem 0 1rem; letter-spacing: -0.02em; }
.pd-body h2::before {
  content: '';
  display: inline-block; width: 4px; height: 1em;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 2px; margin-right: 0.6rem;
  vertical-align: middle; position: relative; top: -1px;
}
</style>
