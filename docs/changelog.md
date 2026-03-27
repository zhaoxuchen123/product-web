---
layout: page
---

<script setup>
import { Cpu, Network, Wrench } from 'lucide-vue-next'

const entries = [
  { year: 2026, product: '网络中间件工具', icon: Wrench, version: '1.8.2', type: 'patch', typeLabel: '修复',  date: '2026-03-10', link: '/products/middleware/changelog',     items: ['修复 MQTT 客户端重连死锁问题', 'HTTP Server 分块传输稳定性优化'] },
  { year: 2026, product: '网络协议栈',     icon: Network, version: '3.1.0', type: 'minor', typeLabel: '功能',  date: '2026-01-20', link: '/products/network-stack/changelog',  items: ['新增 DHCPv6 客户端支持', 'TCP CUBIC 拥塞控制算法', 'IPv6 路由查找性能提升 30%'] },
  { year: 2026, product: '网络中间件工具', icon: Wrench, version: '1.8.0', type: 'minor', typeLabel: '功能',  date: '2026-01-15', link: '/products/middleware/changelog',     items: ['新增 CoAP 客户端（Beta）', 'MQTT 5.0 协议支持'] },
  { year: 2025, product: '网卡驱动库',     icon: Cpu,     version: '2.4.1', type: 'patch', typeLabel: '修复',  date: '2025-12-15', link: '/products/nic-driver/changelog',       items: ['修复 RTL8111 高负载 DMA 溢出问题', '优化 i210 中断合并参数'] },
  { year: 2025, product: '网络协议栈',     icon: Network, version: '3.0.1', type: 'patch', typeLabel: '修复',  date: '2025-11-30', link: '/products/network-stack/changelog',  items: ['修复 DNS 解析器 CNAME 死循环', '修复 TCP keepalive 计数器异常'] },
  { year: 2025, product: '网络中间件工具', icon: Wrench, version: '1.7.0', type: 'minor', typeLabel: '功能',  date: '2025-10-22', link: '/products/middleware/changelog',     items: ['HTTP/MQTT TLS 加密支持', 'Modbus TCP 写多寄存器（FC16）'] },
  { year: 2025, product: '网卡驱动库',     icon: Cpu,     version: '2.4.0', type: 'minor', typeLabel: '功能',  date: '2025-10-08', link: '/products/nic-driver/changelog',       items: ['新增 Cadence GEM 驱动', '多队列 API 支持'] },
  { year: 2025, product: '网络协议栈',     icon: Network, version: '3.0.0', type: 'major', typeLabel: '重大',  date: '2025-09-15', link: '/products/network-stack/changelog',  items: ['IPv6 全特性正式支持（SLAAC、NDP）', 'Socket API POSIX 完整兼容', '内存碎片率降低 40%'] },
]

const years = [...new Set(entries.map(e => e.year))].sort((a,b) => b-a)
</script>

<div class="cl-page">
  <div class="cl-header">
    <div class="cl-eyebrow">Release History</div>
    <h1 class="cl-title">全局更新日志</h1>
    <p class="cl-sub">所有产品版本按时间倒序汇总</p>
  </div>

  <div class="cl-timeline" v-for="year in years" :key="year">
    <div class="cl-year-badge">{{ year }}</div>
    <div class="cl-entries">
      <a class="cl-entry" v-for="e in entries.filter(x=>x.year===year)" :key="e.version+e.product" :href="e.link">
        <div class="cl-entry-dot" :class="'dot-'+e.type" />
        <div class="cl-entry-card">
          <div class="cl-entry-head">
            <div class="cl-entry-product">
              <div class="cl-entry-icon">
                <component :is="e.icon" :size="15" stroke-width="1.8" />
              </div>
              <span class="cl-entry-name">{{ e.product }}</span>
              <code class="cl-entry-ver">v{{ e.version }}</code>
              <span :class="['cl-entry-type', 'type-'+e.type]">{{ e.typeLabel }}</span>
            </div>
            <span class="cl-entry-date">{{ e.date }}</span>
          </div>
          <ul class="cl-entry-items">
            <li v-for="item in e.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </a>
    </div>
  </div>
</div>

<style scoped>
.cl-page { max-width: 780px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
.cl-header { text-align: center; margin-bottom: 3rem; }
.cl-eyebrow {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--vp-c-brand-1); background: rgba(59,130,246,.1);
  border: 1px solid rgba(59,130,246,.2); border-radius: 20px;
  padding: 3px 12px; margin-bottom: 0.75rem;
}
.cl-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.5rem; color: var(--vp-c-text-1); }
.cl-sub { font-size: 0.95rem; color: var(--vp-c-text-3); }

.cl-timeline { position: relative; margin-bottom: 2.5rem; }
.cl-year-badge {
  display: inline-flex; align-items: center;
  font-size: 0.9rem; font-weight: 800; letter-spacing: -0.02em;
  color: var(--vp-c-brand-1);
  background: rgba(59,130,246,.08);
  border: 1px solid rgba(59,130,246,.2);
  border-radius: 20px; padding: 4px 16px;
  margin-bottom: 1rem;
}
.cl-entries {
  position: relative; padding-left: 1.5rem;
  border-left: 2px solid var(--card-border);
  display: flex; flex-direction: column; gap: 0.85rem;
}
.cl-entry {
  position: relative; display: block; text-decoration: none; color: inherit;
}
.cl-entry-dot {
  position: absolute; left: -1.72rem; top: 1.1rem;
  width: 10px; height: 10px; border-radius: 50%;
  border: 2px solid var(--vp-c-bg);
  z-index: 1;
}
.dot-major { background: #ef4444; box-shadow: 0 0 6px rgba(239,68,68,.5); }
.dot-minor { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,.5); }
.dot-patch { background: #3b82f6; box-shadow: 0 0 6px rgba(59,130,246,.5); }
.cl-entry-card {
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.cl-entry:hover .cl-entry-card {
  border-color: var(--card-hover-border);
  box-shadow: var(--card-hover-shadow);
  transform: translateX(4px);
}
.cl-entry-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;
}
.cl-entry-product { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.cl-entry-icon {
  width: 26px; height: 26px; border-radius: 7px;
  background: linear-gradient(135deg, rgba(59,130,246,.12), rgba(139,92,246,.12));
  border: 1px solid rgba(59,130,246,.18);
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-brand-1);
}
.cl-entry-name { font-size: 0.9rem; font-weight: 600; color: var(--vp-c-text-1); }
.cl-entry-ver {
  font-family: var(--vp-font-family-mono); font-size: 0.72rem;
  background: var(--vp-c-default-soft); padding: 1px 6px;
  border-radius: 5px; color: var(--vp-c-text-3);
}
.cl-entry-type { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; text-transform: uppercase; letter-spacing: .3px; }
.type-major { background: rgba(239,68,68,.12); color: #ef4444; }
.type-minor { background: rgba(34,197,94,.12); color: #22c55e; }
.type-patch { background: rgba(59,130,246,.12); color: #3b82f6; }
.cl-entry-date { font-size: 0.78rem; color: var(--vp-c-text-3); white-space: nowrap; }
.cl-entry-items {
  margin: 0; padding-left: 1.1rem;
  list-style: disc;
}
.cl-entry-items li { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.7; margin: 0.15rem 0; }
</style>
