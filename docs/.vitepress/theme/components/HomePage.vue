<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-bg">
        <div class="blob blob-1" />
        <div class="blob blob-2" />
        <div class="blob blob-3" />
        <div class="grid-bg" />
      </div>
      <div class="container hero-inner">
        <div class="hero-left">
          <div class="eyebrow">南京翼辉信息 · 网络技术部</div>
          <h1 class="hero-title">
            <span class="grad">全链路网络软件</span><br />
            <span class="hero-title-sub">解决方案与产品</span>
          </h1>
          <p class="hero-desc">
            覆盖驱动、网络协议栈、网络安全、网络软硬件解决方案与产品，
            为集团客户提供高性能、高可靠的完整网络能力。
          </p>
          <div class="hero-actions">
            <a :href="withBase('/products/')" class="btn-primary">查看所有产品 <ArrowRight :size="16" /></a>
            <a :href="withBase('/changelog')" class="btn-ghost">更新日志</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">2</span><span class="stat-label">核心产品</span></div>
            <div class="stat-div" />
            <div class="stat"><span class="stat-num">20+</span><span class="stat-label">支持芯片</span></div>
            <div class="stat-div" />
            <div class="stat"><span class="stat-num">4+</span><span class="stat-label">网络工具</span></div>
            <div class="stat-div" />
            <div class="stat"><span class="stat-num">Armory</span><span class="stat-label">统一分发</span></div>
          </div>
        </div>
        <div class="hero-right">
          <NetworkDiagram />
        </div>
      </div>
    </section>

    <!-- ===== PRODUCTS ===== -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">产品矩阵</div>
          <h2 class="section-title">我们的产品</h2>
          <p class="section-desc">从底层硬件驱动到上层应用协议等，提供完整的网络技术栈</p>
        </div>
        <div class="cards">
          <a :href="withBase(p.link)" class="card" v-for="p in products" :key="p.title">
            <div class="card-glow" />
            <div class="card-top">
              <div class="card-icon-wrap">
                <component :is="p.icon" :size="26" :stroke-width="1.5" class="card-icon-svg" />
              </div>
              <span :class="['card-tag', p.tagClass]">{{ p.tag }}</span>
            </div>
            <h3 class="card-title">{{ p.title }}</h3>
            <p class="card-desc">{{ p.desc }}</p>
            <div class="card-footer">
              <code v-if="p.version" class="card-ver">v{{ p.version }}</code>
              <code v-else-if="p.latestPkg" class="card-ver">{{ p.latestPkg }}</code>
              <span class="card-link">了解详情 <ArrowRight :size="13" class="card-arrow" /></span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== LATEST UPDATES ===== -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">动态</div>
          <h2 class="section-title">最新更新</h2>
          <p class="section-desc">各产品最近发布的版本摘要</p>
        </div>
        <div class="updates">
          <a v-for="u in updates" :key="u.version" :href="withBase(u.link)" class="update-item">
            <div class="update-left">
              <div class="update-icon-wrap">
                <component :is="u.icon" :size="20" :stroke-width="1.5" class="update-icon-svg" />
              </div>
              <div class="update-info">
                <div class="update-title">
                  {{ u.product }}
                  <code class="update-ver">{{ u.version }}</code>
                  <span v-if="u.pkg" class="update-pkg">{{ u.pkg }}</span>
                  <span :class="['update-type', u.typeClass]">{{ u.type }}</span>
                </div>
                <div class="update-desc">{{ u.desc }}</div>
              </div>
            </div>
            <div class="update-meta">
              <span class="update-date">{{ u.date }}</span>
              <ArrowRight :size="15" class="update-arrow" />
            </div>
          </a>
        </div>
        <div class="see-all">
          <a :href="withBase('/changelog')" class="btn-ghost">查看全部更新日志</a>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section class="section">
      <div class="container">
        <div class="about">
          <div class="about-text">
            <div class="section-tag">关于我们</div>
            <h2 class="section-title" style="text-align:left">翼辉信息 · 网络部</h2>
            <p class="about-desc">
              我们是翼辉信息的网络技术部门，深耕 SylixOS 平台的网络基础软件研发。
              当前主要面向集团内部其他部门与业务团队提供高质量的网络驱动与工具支撑，
              同时也在积极推进若干面向市场的独立产品设计与规划。
            </p>
            <div class="about-pills">
              <span class="pill"><Cpu :size="13" /> 网卡驱动</span>
              <span class="pill"><Terminal :size="13" /> 网络工具</span>
              <span class="pill"><Factory :size="13" /> 基础软件</span>
              <span class="pill"><Rocket :size="13" /> 独立产品</span>
            </div>
          </div>
          <div class="about-grid">
            <div class="ag-item" v-for="f in features" :key="f.title">
              <component :is="f.icon" :size="22" :stroke-width="1.5" class="ag-icon" />
              <div class="ag-title">{{ f.title }}</div>
              <div class="ag-desc">{{ f.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight, Cpu, Network, Wrench, Zap, Feather, ShieldCheck, Puzzle,
  Factory, Wifi, Car, Rocket, Terminal
} from 'lucide-vue-next'
import { withBase } from 'vitepress'
import NetworkDiagram from './NetworkDiagram.vue'

const products = [
  {
    icon: Cpu, title: '网卡驱动库', tag: '活跃开发', tagClass: 'tag-active',
    desc: '支持 DW GMAC、Intel igb/igc/i40e、Realtek RTL8111、Cadence GEM 等，各驱动独立版本，通过 Armory 按需安装。',
    version: null, latestPkg: 'dw-gmac-rk3568 1.2.0', link: '/products/nic-driver/'
  },
  {
    icon: Terminal, title: '网络工具', tag: '活跃开发', tagClass: 'tag-active',
    desc: 'ifethtool、vndbind、xgro、pppd 等 SylixOS 网络配置与调试工具，兼容 Linux 主流工具使用习惯。',
    version: '1.0.0', link: '/products/tools/'
  },
]

const updates = [
  { icon: Cpu,      product: '网卡驱动库', pkg: 'ngbe · WX1860', version: 'HEAD',    type: '功能', typeClass: 'type-minor',
    desc: '新增单播 / 组播地址过滤，新增 PHY 寄存器读写 Shell 命令', date: '2026-03-06', link: '/products/nic-driver/wangxun/ngbe' },
  { icon: Terminal, product: '网络工具',   pkg: 'xgro',          version: '2.0.0',   type: '重构', typeClass: 'type-major',
    desc: '重构为 2.0.0，新增 Cache 对齐优化，改进哈希算法', date: '2026-01-19', link: '/products/tools/xgro' },
]

const features = [
  { icon: Cpu,         title: '驱动支持',   desc: '覆盖主流 PCIe 与 SoC 网卡，持续扩充' },
  { icon: Zap,         title: '面向集团',   desc: '优先为集团内部业务团队提供稳定支撑' },
  { icon: ShieldCheck, title: '质量优先',   desc: '严格测试验证，保障驱动与工具可靠性' },
  { icon: Puzzle,      title: '独立产品',   desc: '积极规划面向市场的独立产品与解决方案' },
]
</script>

<style scoped>
/* ── Layout ── */
.home { font-family: var(--vp-font-family-base); }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

/* ── Hero ── */
.hero {
  position: relative;
  min-height: 580px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5rem 0 4rem;
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.32;
  animation: float 8s ease-in-out infinite;
}
.blob-1 { width: 500px; height: 500px; background: #3b82f6; top: -150px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 400px; height: 400px; background: #8b5cf6; top: 50px; right: -80px; animation-delay: 2.5s; }
.blob-3 { width: 300px; height: 300px; background: #06b6d4; bottom: -80px; left: 40%; animation-delay: 5s; }
@keyframes float {
  0%,100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.04); }
}
.grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(59,130,246,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,.06) 1px, transparent 1px);
  background-size: 40px 40px;
}
.hero-inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
}
@media(max-width: 860px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-right { display: none; }
}
.eyebrow {
  display: inline-block;
  font-size: 0.78rem; font-weight: 600; letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  background: rgba(59,130,246,.1);
  border: 1px solid rgba(59,130,246,.25);
  border-radius: 20px;
  padding: 4px 14px;
  margin-bottom: 1.25rem;
}
.hero-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900; line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
}
.grad {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-title-sub { color: var(--vp-c-text-1); }
.hero-desc {
  font-size: 1rem; color: var(--vp-c-text-2);
  line-height: 1.75; max-width: 480px; margin: 0 0 2rem;
}
.hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem; align-items: center; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 0.65rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff; font-weight: 700; font-size: 0.92rem;
  border-radius: 10px; text-decoration: none;
  box-shadow: 0 4px 20px rgba(59,130,246,.45);
  transition: box-shadow .2s, transform .2s;
}
.btn-primary:hover { box-shadow: 0 6px 28px rgba(59,130,246,.6); transform: translateY(-2px); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 0.65rem 1.4rem;
  border: 1px solid var(--card-border);
  border-radius: 10px; font-weight: 600; font-size: 0.92rem;
  color: var(--vp-c-text-2); text-decoration: none;
  transition: border-color .2s, color .2s;
  backdrop-filter: blur(8px);
}
.btn-ghost:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.hero-stats { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; }
.stat-num { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-text-1); letter-spacing: -0.03em; }
.stat-label { font-size: 0.72rem; color: var(--vp-c-text-3); margin-top: 2px; }
.stat-div { width: 1px; height: 36px; background: var(--card-border); }

/* ── Section ── */
.section { padding: 5rem 0; }
.section--alt { background: var(--vp-c-bg-soft); }
.section-head { text-align: center; margin-bottom: 2.5rem; }
.section-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  background: rgba(59,130,246,.1);
  border: 1px solid rgba(59,130,246,.2);
  border-radius: 20px; padding: 3px 12px; margin-bottom: 0.75rem;
}
.section-title {
  font-size: 1.85rem; font-weight: 800;
  letter-spacing: -0.03em; color: var(--vp-c-text-1);
  margin: 0 0 0.6rem; text-align: center;
}
.section-desc { font-size: 0.92rem; color: var(--vp-c-text-2); max-width: 480px; margin: 0 auto; line-height: 1.7; }

/* ── Product Cards ── */
.cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
@media(max-width:900px){ .cards { grid-template-columns: 1fr; } }
.card {
  position: relative; overflow: hidden;
  display: flex; flex-direction: column;
  padding: 1.75rem; border-radius: 18px;
  border: 1px solid var(--card-border);
  background: var(--card-bg); backdrop-filter: blur(12px);
  text-decoration: none; color: inherit;
  transition: border-color .25s, box-shadow .25s, transform .25s;
}
.card:hover { border-color: var(--card-hover-border); box-shadow: var(--card-hover-shadow); transform: translateY(-5px); }
.card-glow {
  position: absolute; top: -60px; right: -60px;
  width: 160px; height: 160px;
  background: radial-gradient(circle, rgba(59,130,246,.18) 0%, transparent 70%);
  border-radius: 50%; opacity: 0; transition: opacity .35s; pointer-events: none;
}
.card:hover .card-glow { opacity: 1; }
.card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.1rem; }
.card-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(139,92,246,.1));
  border: 1px solid rgba(59,130,246,.18);
  display: flex; align-items: center; justify-content: center;
}
.card-icon-svg { color: var(--vp-c-brand-1); }
.card-tag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
.tag-stable { background: var(--tag-stable-bg); color: var(--tag-stable-color); }
.tag-active  { background: var(--tag-active-bg);  color: var(--tag-active-color); }
.card-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.6rem; letter-spacing: -0.01em; }
.card-desc { font-size: 0.875rem; color: var(--vp-c-text-2); line-height: 1.7; flex: 1; margin: 0 0 1.25rem; }
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.card-ver { font-family: var(--vp-font-family-mono); font-size: 0.75rem; background: var(--vp-c-default-soft); padding: 2px 7px; border-radius: 5px; color: var(--vp-c-text-3); }
.card-ver-multi { font-size: 0.75rem; background: var(--vp-c-default-soft); padding: 2px 7px; border-radius: 5px; color: var(--vp-c-text-3); }
.card-link { font-size: 0.82rem; font-weight: 600; color: var(--vp-c-brand-1); display: flex; align-items: center; gap: 3px; }
.card-arrow { transition: transform .2s; }
.card:hover .card-arrow { transform: translateX(4px); }

/* ── Updates ── */
.updates { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.update-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.25rem; border-radius: 12px;
  border: 1px solid var(--card-border); background: var(--card-bg);
  text-decoration: none; color: inherit;
  transition: border-color .2s, box-shadow .2s, transform .2s; gap: 1rem;
}
.update-item:hover { border-color: var(--card-hover-border); box-shadow: var(--card-hover-shadow); transform: translateX(4px); }
.update-left { display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0; }
.update-icon-wrap {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(139,92,246,.1));
  border: 1px solid rgba(59,130,246,.15);
  display: flex; align-items: center; justify-content: center;
}
.update-icon-svg { color: var(--vp-c-brand-1); }
.update-info { min-width: 0; }
.update-title { font-size: 0.92rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.2rem; }
.update-ver { font-family: var(--vp-font-family-mono); font-size: 0.73rem; background: var(--vp-c-default-soft); padding: 1px 6px; border-radius: 5px; color: var(--vp-c-text-3); font-weight: 400; }
.update-pkg { font-family: var(--vp-font-family-mono); font-size: 0.68rem; font-weight: 600; padding: 1px 8px; border-radius: 20px; background: rgba(139,92,246,0.1); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.2); }
.update-type { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; letter-spacing: .3px; text-transform: uppercase; }
.type-patch { background: rgba(59,130,246,.12); color: #3b82f6; }
.type-minor { background: rgba(34,197,94,.12); color: #22c55e; }
.type-major { background: rgba(239,68,68,.12); color: #ef4444; }
.update-desc { font-size: 0.82rem; color: var(--vp-c-text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.update-meta { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
.update-date { font-size: 0.78rem; color: var(--vp-c-text-3); white-space: nowrap; }
.update-arrow { color: var(--vp-c-brand-1); transition: transform .2s; }
.update-item:hover .update-arrow { transform: translateX(4px); }
.see-all { text-align: center; margin-top: 1.25rem; }

/* ── About ── */
.about { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
@media(max-width:768px){ .about { grid-template-columns: 1fr; gap: 2rem; } }
.about-text .section-title { text-align: left; }
.about-desc { font-size: 0.95rem; color: var(--vp-c-text-2); line-height: 1.8; margin: 0.75rem 0 1.25rem; }
.about-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.82rem; font-weight: 500;
  padding: 5px 14px; border-radius: 20px;
  background: var(--vp-c-default-soft);
  border: 1px solid var(--card-border);
  color: var(--vp-c-text-2);
}
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.ag-item {
  padding: 1.25rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg);
  transition: border-color .2s, box-shadow .2s;
}
.ag-item:hover { border-color: var(--card-hover-border); box-shadow: var(--card-hover-shadow); }
.ag-icon { color: var(--vp-c-brand-1); margin-bottom: 0.6rem; }
.ag-title { font-size: 0.95rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.3rem; }
.ag-desc { font-size: 0.82rem; color: var(--vp-c-text-3); line-height: 1.5; }
</style>
