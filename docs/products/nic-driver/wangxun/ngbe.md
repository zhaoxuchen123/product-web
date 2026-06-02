# ngbe · 网讯千兆网卡 WX1860

<script setup>
import BoardTabs from '../../../.vitepress/theme/components/BoardTabs.vue'
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'

const boards = [
  {
    name: 'WX1860AL-W',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE',          code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8088:0x0100',   code: true  },
      { label: '接口',    value: 'RJ45（含 Wi-Fi）', code: false },
    ],
    notes: [
      'AL-W 为含无线模组版本，有线口走 PCIe 枚举',
      '支持 1G / 100M / 10M 自适应',
      '支持 MSI-X 中断',
    ],
  },
  {
    name: 'WX1860A2',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×2',       code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8088:0x0101',   code: true  },
      { label: '接口',    value: 'RJ45 ×2',         code: false },
    ],
    notes: [
      '双口千兆，每口独立 PCIe Function',
      '支持 1G / 100M / 10M 自适应',
    ],
    snippet:
`ngbe_init_module();`,
  },
  {
    name: 'WX1860A4',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×4',       code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8088:0x0103',   code: true  },
      { label: '接口',    value: 'RJ45 ×4',         code: false },
    ],
    notes: [
      '四口千兆，枚举为 4 个独立网口',
      '适合多口接入场景',
    ],
    snippet:
`ngbe_init_module();`,
  },
  {
    name: 'WX1860AL4',
    vendor: '网讯科技（Wangxun）',
    status: 'stable',
    diffs: [
      { label: '速率',    value: '1 GbE ×4',       code: false },
      { label: '总线',    value: 'PCIe',            code: false },
      { label: 'PCI ID',  value: '0x8088:0x0107',   code: true  },
      { label: '接口',    value: 'SFP ×4',          code: false },
    ],
    notes: [
      '四口光纤千兆，SFP 接口',
      '适合机房光纤接入场景',
    ],
    snippet:
`ngbe_init_module();`,
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / 网讯系列 / ngbe</div>
    <h1 class="plat-title">ngbe</h1>
    <p class="plat-mfr">网讯科技（Wangxun）· PCIe 千兆</p>
    <VersionBadge product="nic-driver/ngbe" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/package/nic_drv/ngbe_nic_drv/1.2.6" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">1 GbE</span><span class="ps-label">网口速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">国产</span><span class="ps-label">自主可控</span></div>
    <div class="plat-stat"><span class="ps-val">多口</span><span class="ps-label">最多四口</span></div>
  </div>
</div>

<ArmoryFetch pkg="libngbe" command="armory get @nic_drv/ngbe_nic_drv@1.2.6" detailHref="http://10.7.1.31/acohub/armory/package/nic_drv/ngbe_nic_drv/1.2.6" />

## 安装与加载

ngbe 驱动支持两种使用方式，根据 BSP 类型选择：

### 方式一：静态库

将驱动编译为静态库 `libngbe.a`，随 BSP 一起编译链接。

在 BSP Makefile 中添加链接依赖：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -lngbe \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...
```

在 BSP 启动函数中调用入口函数：

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int ngbe_init_module(void);
    ngbe_init_module();
}
```

### 方式二：内核模块（.ko）

将驱动编译为独立内核模块 `ngbe.ko`，运行时动态加载：

```bash
# 加载驱动模块
insmod ngbe.ko

# 卸载
rmmod ngbe
```

加载后驱动自动枚举 PCIe 总线上的 WX1860 系列设备，按顺序创建 `eth0`、`eth1`...

## 支持型号

<BoardTabs :boards="boards" />

## 支持设备列表

ngbe 驱动支持以下网讯千兆以太网控制器：

| 型号 | PCI Device ID | 接口 | 备注 |
|------|---------------|------|------|
| WX1860AL-W | 0x0100 | RJ45 | 含无线模组 |
| WX1860A2   | 0x0101 | RJ45 ×2 | 双口 |
| WX1860A2S  | 0x0102 | RJ45 ×2 | 双口（S 型） |
| WX1860A4   | 0x0103 | RJ45 ×4 | 四口 |
| WX1860A4S  | 0x0104 | RJ45 ×4 | 四口（S 型） |
| WX1860AL2  | 0x0105 | SFP ×2 | 双口光纤 |
| WX1860AL2S | 0x0106 | SFP ×2 | 双口光纤（S 型） |
| WX1860AL4  | 0x0107 | SFP ×4 | 四口光纤 |
| WX1860AL4S | 0x0108 | SFP ×4 | 四口光纤（S 型） |
| WX1860NCSI | 0x0109 | RJ45 | 含 NCSI |
| WX1860A1   | 0x010a | RJ45 | 单口 |
| WX1860A1L  | 0x010b | SFP | 单口光纤 |

Vendor ID 均为 `0x8088`。

## 最新更新

<ChangelogEntry version="1.2.6" date="2025-11-21" type="patch">

- 修复 pbuf 链在 ifup/ifdown 时无法释放的问题

</ChangelogEntry>

<ChangelogEntry version="HEAD" date="2026-03-06" type="minor">

- 新增单播 / 组播地址过滤功能
- 新增 Shell 命令，支持读写 PHY 寄存器
- 修复 pbuf 链接收时无法释放的问题
- 修复不支持软件 VLAN 的问题

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
</style>
