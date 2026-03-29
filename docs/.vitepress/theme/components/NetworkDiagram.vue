<template>
  <div class="pd">
    <div class="pd-card pd-card--active">
      <div class="pd-card-top">
        <div class="pd-icon">🔌</div>
        <span class="pd-tag pd-tag--active">活跃开发</span>
      </div>
      <div class="pd-name">网卡驱动库</div>
      <div class="pd-desc">DW GMAC · Intel · 网讯 · 沐创 · 裕太微</div>
      <div class="pd-chips">
        <span class="pd-chip">20+ 芯片</span>
        <span class="pd-chip">40G</span>
        <span class="pd-chip">Armory</span>
      </div>
    </div>

    <div class="pd-card pd-card--active">
      <div class="pd-card-top">
        <div class="pd-icon">🛠️</div>
        <span class="pd-tag pd-tag--active">活跃开发</span>
      </div>
      <div class="pd-name">网络工具</div>
      <div class="pd-desc">ifethtool · xgro · vndbind · pppd</div>
      <div class="pd-chips">
        <span class="pd-chip">ethtool 兼容</span>
        <span class="pd-chip">GRO</span>
        <span class="pd-chip">PPP</span>
      </div>
    </div>

    <div class="pd-card pd-card--planned">
      <div class="pd-card-top">
        <div class="pd-icon">📦</div>
        <span class="pd-tag pd-tag--planned">规划中</span>
      </div>
      <div class="pd-name">网络产品</div>
      <div class="pd-desc">独立产品，内容待定</div>
      <div class="pd-chips">
        <span class="pd-chip pd-chip--dim">敬请期待</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pd {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 380px;
  padding: 0.5rem 0;
}
.pd-card {
  padding: 1rem 1.25rem;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.pd-card--active {
  border-color: rgba(59,130,246,0.25);
  background: rgba(59,130,246,0.03);
}
.pd-card--planned {
  opacity: 0.6;
}
.pd-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.pd-icon {
  font-size: 1.2rem;
  line-height: 1;
}
.pd-tag {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}
.pd-tag--active {
  background: rgba(34,197,94,0.12);
  color: #22c55e;
}
.pd-tag--planned {
  background: rgba(148,163,184,0.15);
  color: var(--vp-c-text-3);
}
.pd-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}
.pd-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.6rem;
  line-height: 1.5;
}
.pd-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.pd-chip {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--vp-c-default-soft);
  border: 1px solid var(--card-border);
  color: var(--vp-c-text-2);
}
.pd-chip--dim {
  color: var(--vp-c-text-3);
}
</style>
