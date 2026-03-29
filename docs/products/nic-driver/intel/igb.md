# igb 系列 · Intel 千兆网卡

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'

const boards = [
  {
    name: 'i210',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE',         code: false },
      { label: '总线',    value: 'PCIe Gen2 x1',   code: false },
      { label: '接口',    value: 'RJ45 / SFP',     code: false },
      { label: 'PTP',     value: '支持',            code: false },
    ],
    notes: [
      '支持 Copper（RJ45）、Fiber（SFP）、SerDes、SGMII 多种物理层',
      '支持 IEEE 1588 PTP 硬件时间戳',
      '支持 Wake-on-LAN、MSI-X 中断',
    ],
    snippet:
`/* PCIe 设备由驱动自动枚举，无需手动配置基地址 */
/* 驱动加载后按 PCI BDF 顺序创建 eth0, eth1... */
netcard_intel_attach();`,
  },
  {
    name: 'i211',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE',         code: false },
      { label: '总线',    value: 'PCIe Gen2 x1',   code: false },
      { label: '接口',    value: 'RJ45',           code: false },
      { label: 'TX/RX 队列', value: '4',          code: false },
    ],
    notes: [
      'i211 是 i210 的精简版，去掉了 Flash 存储和部分高级功能',
      'TX/RX 队列数为 4（i210 为 8），适合成本敏感场景',
      '不支持 SR-IOV',
    ],
    snippet:
`/* 与 i210 共用驱动，设备 ID 自动识别 */
netcard_intel_attach();`,
  },
  {
    name: 'i350',
    vendor: 'Intel',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×2/×4',   code: false },
      { label: '总线',    value: 'PCIe Gen2 x4',   code: false },
      { label: '接口',    value: 'RJ45 / SFP',     code: false },
      { label: 'SR-IOV',  value: '8 VF / port',    code: false },
    ],
    notes: [
      'i350 为多口网卡（-T2 双口、-T4 四口），每口独立 PCIe Function',
      '支持 SR-IOV 虚拟化，最多 8 个 VF/port',
      '支持 IEEE 1588 PTP 和 Energy Efficient Ethernet (EEE)',
    ],
    snippet:
`/* i350-T4 四口，fn 0~3 各对应一个网口 */
netcard_intel_attach();`,
  },
]
</script>
<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / Intel / igb</div>
    <h1 class="plat-title">igb 系列</h1>
    <p class="plat-mfr">Intel · PCIe 千兆 · i210 / i211 / i350</p>
    <span class="plat-badge stable">v5.18.7</span>
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">1 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">PTP</span><span class="ps-label">硬件时间戳</span></div>
    <div class="plat-stat"><span class="ps-val">SR-IOV</span><span class="ps-label">虚拟化</span></div>
  </div>
</div>

## 安装与加载

igb 系列支持两种使用方式，根据 BSP 类型选择：

### 方式一：静态库

将驱动编译为静态库 `libintel.a`，随 BSP 一起编译链接。

在 BSP Makefile 中添加链接依赖：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -lintel \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...
```

在 BSP 启动函数中调用一次入口函数：

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int netcard_intel_attach(void);
    netcard_intel_attach();
}
```

### 方式二：内核模块（.ko）

将驱动编译为独立内核模块 `igb.ko`，运行时动态加载：

```bash
# 加载驱动模块
insmod igb.ko

# 卸载
rmmod igb
```

加载后驱动自动枚举 PCIe 总线上的 i210/i211/i350 设备，按顺序创建 `eth0`、`eth1`...

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

igb 驱动支持以下 Intel 以太网控制器：

| 型号 | 速率 | 接口 | 特性 |
|------|------|------|------|
| I210-T1 | 1 GbE | RJ45 | PTP、WoL、MSI-X |
| I210-AT | 1 GbE | RJ45 | 同上，附带 Flash |
| I211-AT | 1 GbE | RJ45 | 精简版，4 队列 |
| I350-T2 | 1 GbE ×2 | RJ45 | SR-IOV、EEE |
| I350-T4 | 1 GbE ×4 | RJ45 | SR-IOV、EEE |
| I350-F2 | 1 GbE ×2 | SFP | 光纤版 |

## 已知问题

<div class="issues">
  <div class="issue">
    <span class="issue-tag open">已知</span>
    <span>i211 在部分 PCIe 主控下上电枚举偶发失败，重启后恢复，根因待查</span>
  </div>
</div>

<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.plat-version { font-size: 0.72rem; color: var(--vp-c-text-3); margin-top: 0.4rem; display: block; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
.issues { display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0; }
.issue {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.6rem 0.9rem; border-radius: 8px;
  border: 1px solid var(--card-border);
  font-size: 0.85rem; color: var(--vp-c-text-2);
}
.issue-tag { font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; flex-shrink: 0; }
.issue-tag.open { background: rgba(234,179,8,.12); color: #eab308; }
</style>
