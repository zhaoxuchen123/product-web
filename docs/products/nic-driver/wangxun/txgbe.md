# txgbe · 网讯万兆网卡 WX1820

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'

const boards = [
  {
    name: 'WX1820',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '10 GbE',         code: false },
      { label: '总线',    value: 'PCIe Gen3 x8',   code: false },
      { label: 'PCI ID',  value: '0x8088:0x2001',  code: true  },
      { label: '接口',    value: 'SFP+',            code: false },
    ],
    notes: [
      'SFP+ 接口，支持光模块及 DAC 铜缆',
      '支持 SR-IOV 虚拟化',
      '支持 RSS 多队列分流',
      '支持 VLAN 硬件卸载',
    ],
    snippet:
`/* PCIe 设备自动枚举，驱动加载后创建 eth0, eth1... */
txgbe_init_module();`,
  },
  {
    name: 'SP1000',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '10 GbE',         code: false },
      { label: '总线',    value: 'PCIe Gen3 x8',   code: false },
      { label: 'PCI ID',  value: '0x8088:0x1001',  code: true  },
      { label: '接口',    value: 'SFP+ / XAUI',    code: false },
    ],
    notes: [
      '支持 XAUI、SGMII、KR/KX/KX4 多种背板接口',
      '支持 SR-IOV 虚拟化',
    ],
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / 网讯系列 / txgbe</div>
    <h1 class="plat-title">txgbe</h1>
    <p class="plat-mfr">网讯科技（Wangxun）· PCIe 万兆</p>
    <VersionBadge product="nic-driver/txgbe" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/package/nic_drv/txgbe_nic_drv/3.6.9-beta" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">10 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe Gen3</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">SR-IOV</span><span class="ps-label">虚拟化</span></div>
    <div class="plat-stat"><span class="ps-val">国产</span><span class="ps-label">自主可控</span></div>
  </div>
</div>

<ArmoryFetch pkg="libtxgbe" command="armory get @nic_drv/txgbe_nic_drv@3.6.9-beta" detailHref="http://10.7.1.31/acohub/armory/package/nic_drv/txgbe_nic_drv/3.6.9-beta" />

## 安装与加载

txgbe 驱动支持两种使用方式，根据 BSP 类型选择：

### 方式一：静态库

将驱动编译为静态库 `libtxgbe.a`，随 BSP 一起编译链接。

在 BSP Makefile 中添加链接依赖：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -ltxgbe \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...
```

在 BSP 启动函数中调用入口函数：

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int txgbe_init_module(void);
    txgbe_init_module();
}
```

### 方式二：内核模块（.ko）

将驱动编译为独立内核模块 `txgbe.ko`，运行时动态加载：

```bash
# 加载驱动模块
insmod txgbe.ko

# 卸载
rmmod txgbe
```

加载后驱动自动枚举 PCIe 总线上的 WX1820 / SP1000 设备，按顺序创建 `eth0`、`eth1`...

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

txgbe 驱动支持以下网讯万兆以太网控制器：

| 型号 | PCI Device ID | 接口 | 备注 |
|------|---------------|------|------|
| WX1820 | 0x2001 | SFP+ | 主流万兆型号 |
| SP1000 | 0x1001 | SFP+ / XAUI | 背板互联型号 |

Vendor ID 均为 `0x8088`。

## 已知问题

<div class="issues">
  <div class="issue">
    <span class="issue-tag open">已知</span>
    <span>SR-IOV 场景下，VF 同时开启混杂模式时可能跨 VLAN 收包，建议避免在多 VLAN 环境下对 VF 开启混杂模式</span>
  </div>
</div>

## 最新更新

<ChangelogEntry version="1.3.6.9" date="2025-11-06" type="patch">

- 修复 SR-IOV 场景 VF 混杂模式下跨 VLAN 收包问题
- 修复 `ethtool -K rx-all on` 错误开启混杂模式的问题
- 修复 QinQ 双层 VLAN 报文导致 TX 单元挂起的问题

</ChangelogEntry>

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
