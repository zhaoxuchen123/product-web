<template>
  <div class="pd">
    <!-- 两张活跃产品卡片，2列网格 -->
    <div class="pd-grid">
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
    </div>

    <!-- 即将推出，单独区域 -->
    <div class="pd-coming">
      <span class="pd-coming-label">🚀 即将推出</span>
      <span class="pd-coming-name">网络产品</span>
      <span class="pd-coming-sep">—</span>
      <span class="pd-coming-desc">独立产品，敬请期待</span>
    </div>
  </div>
</template>

<style scoped>
.pd {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 420px;
  padding: 0.5rem 0;
}
.pd-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.pd-card {
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.pd-card--active {
  border-color: rgba(59,130,246,0.25);
  background: rgba(59,130,246,0.03);
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
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
}
.pd-tag--active {
  background: rgba(34,197,94,0.12);
  color: #22c55e;
}
.pd-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}
.pd-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.6rem;
  line-height: 1.5;
}
.pd-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.pd-chip {
  font-size: 0.62rem;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 20px;
  background: var(--vp-c-default-soft);
  border: 1px solid var(--card-border);
  color: var(--vp-c-text-2);
}
.pd-coming {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  border: 1px dashed rgba(139,92,246,0.3);
  background: rgba(139,92,246,0.04);
  font-size: 0.78rem;
}
.pd-coming-label {
  font-weight: 700;
  color: #8b5cf6;
  white-space: nowrap;
}
.pd-coming-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}
.pd-coming-sep {
  color: var(--vp-c-text-3);
}
.pd-coming-desc {
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
</style>
