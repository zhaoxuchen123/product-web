---
layout: page
---

<script setup>
import { Cpu, Terminal, Activity, GitCommit, Package, Calendar } from 'lucide-vue-next'

const entries = [
  { year: 2026, product: '网络工具',    icon: Terminal, pkg: 'ifethtool',          version: '1.0.1',     type: 'minor', typeLabel: '功能', date: '2026-04-17', link: '/products/tools/ifethtool/',          items: ['新增 `-m/-M`，支持查询和设置 MAC 地址', '新增 `-t/-T`、`-p/-P`、`-u/-U`', '支持命令总数由 17 个扩展到 25 个'] },
  { year: 2026, product: '网卡驱动库',  icon: Cpu,     pkg: 'ngbe · WX1860',      version: 'HEAD',      type: 'minor', typeLabel: '功能', date: '2026-03-06', link: '/products/nic-driver/wangxun/ngbe',   items: ['新增单播 / 组播地址过滤功能', '新增 Shell 命令支持读写 PHY 寄存器', '修复 pbuf 链接收时无法释放的问题', '修复不支持软件 VLAN 的问题'] },
  { year: 2026, product: '网络工具',    icon: Terminal, pkg: 'xgro',               version: '2.0.0',     type: 'major', typeLabel: '重构', date: '2026-01-19', link: '/products/tools/xgro',                items: ['重构为 2.0.0，新增 Cache 对齐优化', '改进 Jenkins 类哈希算法，减少流表碰撞', '无锁快慢路径优化，降低自旋锁竞争'] },
  { year: 2025, product: '网络工具',    icon: Terminal, pkg: 'pppd',               version: '1.1.0',     type: 'minor', typeLabel: '发布', date: '2025-12-11', link: '/products/tools/pppd',                items: ['初始版本发布，支持 PPPoS 串口连接', '支持 PAP/CHAP 认证、自动重连'] },
  { year: 2025, product: '网卡驱动库',  icon: Cpu,     pkg: 'ngbe · WX1860',      version: '1.2.6.5',   type: 'patch', typeLabel: '修复', date: '2025-11-21', link: '/products/nic-driver/wangxun/ngbe',   items: ['修复 pbuf 链在 ifup/ifdown 时无法释放的问题'] },
  { year: 2025, product: '网卡驱动库',  icon: Cpu,     pkg: 'txgbe · WX1820',     version: '1.3.6.9',   type: 'patch', typeLabel: '修复', date: '2025-11-06', link: '/products/nic-driver/wangxun/txgbe',  items: ['修复 SR-IOV 场景 VF 混杂模式下跨 VLAN 收包问题', '修复 ethtool -K rx-all on 错误开启混杂模式', '修复 QinQ 双层 VLAN 报文导致 TX 挂起'] },
  { year: 2025, product: '网络工具',    icon: Terminal, pkg: 'ifethtool',          version: '1.0.0',     type: 'minor', typeLabel: '发布', date: '2025-10-27', link: '/products/tools/ifethtool/',          items: ['初始版本发布，支持 17 个 ethtool 兼容命令', '支持 DW 网卡（v3.0.20+）'] },
  { year: 2025, product: '网络工具',    icon: Terminal, pkg: 'vndbind',            version: '1.0.0',     type: 'minor', typeLabel: '发布', date: '2025-10-27', link: '/products/tools/vndbind',             items: ['初始版本发布，支持虚拟网卡绑定与管理'] },
  { year: 2025, product: '网卡驱动库',  icon: Cpu,     pkg: 'yt6801 · 裕太微',    version: '1.0.2',     type: 'minor', typeLabel: '功能', date: '2025-10-01', link: '/products/nic-driver/yt6801',         items: ['支持裕太微 YT6801 2.5GbE PCIe 网卡'] },
  { year: 2025, product: '网卡驱动库',  icon: Cpu,     pkg: 'igb · Intel',        version: '5.18.7',    type: 'patch', typeLabel: '修复', date: '2025-09-10', link: '/products/nic-driver/intel/igb',      items: ['优化 i210 中断合并参数默认值', '修复 i350 多口场景偶发枚举顺序错乱'] },
  { year: 2025, product: '网卡驱动库',  icon: Cpu,     pkg: 'DW GMAC',            version: '3.0.19',    type: 'minor', typeLabel: '功能', date: '2025-06-20', link: '/products/nic-driver/dw/',            items: ['RK3568 新增 TSO 硬件卸载', 'RK3588 优化多核 RSS 分流', '芯驰 D9 完善 ASIL-B 初始化流程', 'LS2K1000 修复低温下链路不稳问题'] },
]

const years = [...new Set(entries.map(e => e.year))].sort((a,b) => b-a)

// 统计数据
const totalReleases = entries.length
const majorCount = entries.filter(e => e.type === 'major').length
const minorCount = entries.filter(e => e.type === 'minor').length
const patchCount = entries.filter(e => e.type === 'patch').length
const latestDate = entries[0]?.date || '-'

const stats = [
  { icon: GitCommit, label: '总发布数', value: totalReleases },
  { icon: Activity,  label: '功能更新', value: majorCount + minorCount },
  { icon: Package,   label: '缺陷修复', value: patchCount },
  { icon: Calendar,  label: '最近更新', value: latestDate },
]
</script>

<div class="cl-page">
  <div class="cl-header">
    <div class="cl-eyebrow">Release History</div>
    <h1 class="cl-title">全局更新日志</h1>
    <p class="cl-sub">所有产品版本按时间倒序汇总</p>
  </div>

  <!-- 统计摘要 -->
  <div class="cl-stats">
    <div class="cl-stat" v-for="s in stats" :key="s.label">
      <div class="cl-stat-icon">
        <component :is="s.icon" :size="18" :stroke-width="1.8" />
      </div>
      <div class="cl-stat-value">{{ s.value }}</div>
      <div class="cl-stat-label">{{ s.label }}</div>
    </div>
  </div>

  <!-- 筛选图例 -->
  <div class="cl-legend">
    <span class="cl-legend-item"><span class="cl-legend-dot dot-major" /> 重构</span>
    <span class="cl-legend-item"><span class="cl-legend-dot dot-minor" /> 功能 / 发布</span>
    <span class="cl-legend-item"><span class="cl-legend-dot dot-patch" /> 修复</span>
  </div>

  <div class="cl-timeline" v-for="year in years" :key="year">
    <div class="cl-year-badge">{{ year }}</div>
    <div class="cl-entries">
      <a class="cl-entry" v-for="e in entries.filter(x=>x.year===year)" :key="e.version+e.product+e.date" :href="e.link">
        <div class="cl-entry-dot" :class="'dot-'+e.type" />
        <div class="cl-entry-card">
          <div class="cl-entry-head">
            <div class="cl-entry-product">
              <div class="cl-entry-icon">
                <component :is="e.icon" :size="15" stroke-width="1.8" />
              </div>
              <span class="cl-entry-name">{{ e.product }}</span>
              <code class="cl-entry-ver">{{ e.version }}</code>
              <span v-if="e.pkg" class="cl-entry-pkg">{{ e.pkg }}</span>
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
.cl-header { text-align: center; margin-bottom: 2rem; }
.cl-eyebrow {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--vp-c-brand-1); background: rgba(59,130,246,.1);
  border: 1px solid rgba(59,130,246,.2); border-radius: 20px;
  padding: 3px 12px; margin-bottom: 0.75rem;
}
.cl-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.5rem; color: var(--vp-c-text-1); }
.cl-sub { font-size: 0.95rem; color: var(--vp-c-text-3); }

/* ── 统计摘要 ── */
.cl-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  backdrop-filter: blur(8px);
}
@media(max-width:600px) { .cl-stats { grid-template-columns: repeat(2, 1fr); } }
.cl-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.cl-stat-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(139,92,246,.1));
  border: 1px solid rgba(59,130,246,.15);
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}
.cl-stat-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}
.cl-stat-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

/* ── 图例 ── */
.cl-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.cl-legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}
.cl-legend-dot {
  width: 8px; height: 8px; border-radius: 50%;
}
.cl-legend-dot.dot-major { background: #ef4444; box-shadow: 0 0 6px rgba(239,68,68,.4); }
.cl-legend-dot.dot-minor { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,.4); }
.cl-legend-dot.dot-patch { background: #3b82f6; box-shadow: 0 0 6px rgba(59,130,246,.4); }

/* ── 时间轴 ── */
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
.cl-entry-pkg {
  font-family: var(--vp-font-family-mono); font-size: 0.68rem; font-weight: 600;
  padding: 1px 8px; border-radius: 20px;
  background: rgba(139,92,246,0.1); color: #8b5cf6;
  border: 1px solid rgba(139,92,246,0.2);
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
