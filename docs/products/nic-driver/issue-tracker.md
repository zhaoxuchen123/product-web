# 问题追踪

当前开放的已知问题汇总：

<div class="it-issues">
  <div class="it-issue">
    <span class="it-tag open">进行中</span>
    <div class="it-body">
      <div class="it-title">RK3588 双网口高速时 GMAC1 RX FIFO 偶发溢出</div>
      <div class="it-meta">影响版本：dw-gmac-rk3588 v1.1.0 · 预计修复：v1.2.0</div>
    </div>
  </div>
  <div class="it-issue">
    <span class="it-tag open">进行中</span>
    <div class="it-body">
      <div class="it-title">PHY 100M 半双工偶发自协商超时（RK3568）</div>
      <div class="it-meta">影响版本：dw-gmac-rk3568 v1.2.0 · 临时方案：强制固定速率</div>
    </div>
  </div>
  <div class="it-issue">
    <span class="it-tag resolved">已修复</span>
    <div class="it-body">
      <div class="it-title">LS2K1000 大端模式 DMA 描述符字节序错误</div>
      <div class="it-meta">已修复版本：dw-gmac-ls2k1000 v1.0.1</div>
    </div>
  </div>
</div>

<style>
.it-issues { display: flex; flex-direction: column; gap: 0.6rem; margin: 1.5rem 0; }
.it-issue {
  display: flex; align-items: flex-start; gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--card-border);
}
.it-tag { font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
.it-tag.open     { background: rgba(234,179,8,.12); color: #eab308; }
.it-tag.resolved { background: rgba(34,197,94,.12); color: #22c55e; }
.it-title { font-size: 0.88rem; font-weight: 600; color: var(--vp-c-text-1); }
.it-meta  { font-size: 0.75rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
