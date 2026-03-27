<template>
  <div class="nd">
    <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="nd-svg">
      <defs>
        <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
        <linearGradient id="grad-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
        <linearGradient id="grad-purple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <!-- 动态数据包标记 -->
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" opacity="0.6" />
        </marker>
      </defs>

      <!-- 背景装饰圆 -->
      <circle cx="240" cy="210" r="180" stroke="rgba(59,130,246,0.06)" stroke-width="1" />
      <circle cx="240" cy="210" r="130" stroke="rgba(59,130,246,0.08)" stroke-width="1" />
      <circle cx="240" cy="210" r="80" stroke="rgba(59,130,246,0.1)" stroke-width="1" />

      <!-- ===== 连接线 ===== -->
      <!-- 中心到网卡驱动 -->
      <line x1="240" y1="210" x2="240" y2="100" stroke="url(#grad-blue)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5" />
      <!-- 中心到协议栈左 -->
      <line x1="240" y1="210" x2="110" y2="290" stroke="url(#grad-cyan)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5" />
      <!-- 中心到中间件右 -->
      <line x1="240" y1="210" x2="370" y2="290" stroke="url(#grad-purple)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5" />
      <!-- 网卡驱动到硬件 -->
      <line x1="240" y1="100" x2="240" y2="38" stroke="rgba(59,130,246,0.3)" stroke-width="1" stroke-dasharray="3 3" />
      <!-- 协议栈到应用左 -->
      <line x1="110" y1="290" x2="60" y2="370" stroke="rgba(6,182,212,0.3)" stroke-width="1" stroke-dasharray="3 3" />
      <!-- 协议栈到应用右 -->
      <line x1="110" y1="290" x2="160" y2="370" stroke="rgba(6,182,212,0.3)" stroke-width="1" stroke-dasharray="3 3" />
      <!-- 中间件到应用 -->
      <line x1="370" y1="290" x2="320" y2="370" stroke="rgba(139,92,246,0.3)" stroke-width="1" stroke-dasharray="3 3" />
      <line x1="370" y1="290" x2="420" y2="370" stroke="rgba(139,92,246,0.3)" stroke-width="1" stroke-dasharray="3 3" />
      <!-- 协议栈到中间件 -->
      <line x1="110" y1="290" x2="370" y2="290" stroke="rgba(59,130,246,0.15)" stroke-width="1" stroke-dasharray="3 3" />

      <!-- ===== 数据流动画点 ===== -->
      <circle r="3" fill="#3b82f6" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="2.5s" repeatCount="indefinite">
          <mpath href="#path-center-nic" />
        </animateMotion>
      </circle>
      <path id="path-center-nic" d="M240,210 L240,100" stroke="none" />

      <circle r="3" fill="#06b6d4" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s">
          <mpath href="#path-center-stack" />
        </animateMotion>
      </circle>
      <path id="path-center-stack" d="M240,210 L110,290" stroke="none" />

      <circle r="3" fill="#8b5cf6" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s">
          <mpath href="#path-center-mw" />
        </animateMotion>
      </circle>
      <path id="path-center-mw" d="M240,210 L370,290" stroke="none" />

      <!-- ===== 中心节点（协议栈核心） ===== -->
      <circle cx="240" cy="210" r="38" fill="url(#grad-blue)" opacity="0.15" />
      <circle cx="240" cy="210" r="28" fill="url(#grad-blue)" opacity="0.25" filter="url(#glow-strong)" />
      <circle cx="240" cy="210" r="20" fill="url(#grad-blue)" />
      <!-- TCP/IP icon lines -->
      <line x1="232" y1="204" x2="248" y2="204" stroke="white" stroke-width="1.8" stroke-linecap="round" />
      <line x1="232" y1="210" x2="248" y2="210" stroke="white" stroke-width="1.8" stroke-linecap="round" />
      <line x1="232" y1="216" x2="248" y2="216" stroke="white" stroke-width="1.8" stroke-linecap="round" />

      <!-- ===== 网卡驱动节点（顶部） ===== -->
      <rect x="208" y="72" width="64" height="56" rx="12" fill="rgba(15,23,42,0.7)" stroke="url(#grad-blue)" stroke-width="1.5" filter="url(#glow)" />
      <!-- CPU chip icon -->
      <rect x="222" y="84" width="36" height="32" rx="4" fill="none" stroke="#3b82f6" stroke-width="1.5" />
      <rect x="228" y="90" width="24" height="20" rx="2" fill="rgba(59,130,246,0.15)" />
      <line x1="222" y1="91" x2="216" y2="91" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />
      <line x1="222" y1="96" x2="216" y2="96" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />
      <line x1="222" y1="101" x2="216" y2="101" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />
      <line x1="258" y1="91" x2="264" y2="91" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />
      <line x1="258" y1="96" x2="264" y2="96" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />
      <line x1="258" y1="101" x2="264" y2="101" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round" />

      <!-- ===== 协议栈节点（左下） ===== -->
      <rect x="74" y="262" width="72" height="56" rx="12" fill="rgba(15,23,42,0.7)" stroke="url(#grad-cyan)" stroke-width="1.5" filter="url(#glow)" />
      <!-- Network layers icon -->
      <rect x="86" y="272" width="48" height="8" rx="2" fill="rgba(6,182,212,0.25)" stroke="#06b6d4" stroke-width="1" />
      <rect x="86" y="284" width="48" height="8" rx="2" fill="rgba(6,182,212,0.18)" stroke="#06b6d4" stroke-width="1" />
      <rect x="86" y="296" width="48" height="8" rx="2" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" stroke-width="1" />

      <!-- ===== 中间件节点（右下） ===== -->
      <rect x="334" y="262" width="72" height="56" rx="12" fill="rgba(15,23,42,0.7)" stroke="url(#grad-purple)" stroke-width="1.5" filter="url(#glow)" />
      <!-- Wrench / tool icon -->
      <circle cx="370" cy="282" r="8" fill="none" stroke="#8b5cf6" stroke-width="1.5" />
      <line x1="370" y1="290" x2="370" y2="306" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" />
      <line x1="364" y1="300" x2="376" y2="300" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" />

      <!-- ===== 硬件节点（最顶） ===== -->
      <rect x="210" y="14" width="60" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="rgba(59,130,246,0.4)" stroke-width="1" />
      <text x="240" y="29" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">NIC Hardware</text>

      <!-- ===== 叶子节点（底部） ===== -->
      <!-- MQTT -->
      <rect x="34" y="354" width="52" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="rgba(6,182,212,0.4)" stroke-width="1" />
      <text x="60" y="369" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">TCP/UDP</text>
      <!-- DNS -->
      <rect x="134" y="354" width="52" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="rgba(6,182,212,0.4)" stroke-width="1" />
      <text x="160" y="369" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">DHCP/DNS</text>
      <!-- MQTT right -->
      <rect x="294" y="354" width="52" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="rgba(139,92,246,0.4)" stroke-width="1" />
      <text x="320" y="369" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">MQTT 5.0</text>
      <!-- HTTP -->
      <rect x="394" y="354" width="52" height="22" rx="6" fill="rgba(15,23,42,0.8)" stroke="rgba(139,92,246,0.4)" stroke-width="1" />
      <text x="420" y="369" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">HTTP/CoAP</text>

      <!-- ===== 节点标签 ===== -->
      <text x="240" y="68" text-anchor="middle" font-size="11" font-weight="600" fill="#93c5fd" font-family="system-ui">网卡驱动库</text>
      <text x="110" y="258" text-anchor="middle" font-size="11" font-weight="600" fill="#67e8f9" font-family="system-ui">网络协议栈</text>
      <text x="370" y="258" text-anchor="middle" font-size="11" font-weight="600" fill="#c4b5fd" font-family="system-ui">中间件工具</text>
      <text x="240" y="218" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.6)" font-family="monospace">TCP/IP</text>

      <!-- 脉冲动画环 -->
      <circle cx="240" cy="210" r="28" fill="none" stroke="#3b82f6" stroke-width="1" opacity="0">
        <animate attributeName="r" values="28;55" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
</template>

<style scoped>
.nd {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.nd-svg {
  width: 100%;
  max-width: 460px;
  height: auto;
  filter: drop-shadow(0 0 40px rgba(59,130,246,0.12));
}
</style>
