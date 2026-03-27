---
layout: page
---

<script setup>
import { Wrench } from 'lucide-vue-next'
import ProductPageHero from '../../.vitepress/theme/components/ProductPageHero.vue'
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ProductPageHero
  title="网络中间件工具"
  desc="物联网与工业控制场景常用应用层协议中间件，事件驱动架构，支持 TLS 加密，可直接运行于我们的协议栈之上。"
  :icon="Wrench"
  tag="活跃开发"
  version="1.8.2"
  updated="2026-03-10"
  startLink="./getting-started"
  changelogLink="./changelog"
  :stats="[
    { value: '7', label: '协议组件' },
    { value: 'TLS', label: '加密支持' },
    { value: 'MQTT5', label: '最新协议' },
  ]"
  :features="[
    'MQTT 3.1.1 / 5.0，支持 TLS 加密',
    'HTTP/1.1 Server & Client，支持 HTTPS',
    'Modbus TCP，CoAP RFC7252',
    'TFTP Server，NTPv4 Client',
  ]"
/>

<div class="pd-body">

## 产品概述

网络中间件工具集提供物联网与工业控制场景常用的应用层协议中间件，可直接运行于我们的网络协议栈之上，也支持与第三方协议栈集成。

## 组件列表

| 组件 | 协议 | 版本 | 状态 |
|---|---|---|---|
| mqtt-client | MQTT 3.1.1 / 5.0 | 1.3.0 | ✅ 稳定 |
| http-server | HTTP/1.1 | 1.2.1 | ✅ 稳定 |
| http-client | HTTP/1.1 | 1.2.1 | ✅ 稳定 |
| coap-client | CoAP RFC7252 | 0.9.2 | 🚧 Beta |
| modbus-tcp | Modbus TCP | 1.1.0 | ✅ 稳定 |
| tftp-server | TFTP RFC1350 | 1.0.3 | ✅ 稳定 |
| ntp-client | NTPv4 | 1.0.1 | ✅ 稳定 |

## 最新更新

<ChangelogEntry version="1.8.2" date="2026-03-10" type="patch">

- 修复 MQTT 客户端在网络断开时重连逻辑死锁问题
- HTTP Server 优化大文件分块传输稳定性

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
