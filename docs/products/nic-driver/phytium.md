# PHYTIUM · 飞腾网卡 SDK

<script setup>
import BoardTabs from '../../.vitepress/theme/components/BoardTabs.vue'
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'

const boards = [
  {
    name: 'FTD3000 平台',
    vendor: '飞腾信息技术有限公司（Phytium）',
    status: 'beta',
    diffs: [
      { label: '架构',    value: 'arm64',          code: false },
      { label: '总线',    value: 'PCIe',           code: false },
      { label: '速率',    value: '1 GbE / 10 GbE', code: false },
      { label: 'SDK',     value: 'v1.0.0-beta',    code: true  },
    ],
    notes: [
      '设备树版本会解析设备树并依次创建网卡；非设备树版本按板卡平台默认创建全部网卡',
      '单网卡或多网卡场景均只需调用一次 phytmac_attach',
    ],
    snippet:
`VOID bspBoardNetifAttch(VOID)
{
    extern int phytmac_attach(void *reserved);
    phytmac_attach(LW_NULL);
}`,
  },
]
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/nic-driver/">网卡驱动库</a> / PHYTIUM</div>
    <h1 class="plat-title">PHYTIUM 网卡 SDK</h1>
    <p class="plat-mfr">飞腾信息技术有限公司（Phytium）· 国产 PCIe 以太网适配器</p>
    <VersionBadge product="nic-driver/phytium" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">1G/10G</span><span class="ps-label">产品速率</span></div>
    <div class="plat-stat"><span class="ps-val">PCIe</span><span class="ps-label">总线接口</span></div>
    <div class="plat-stat"><span class="ps-val">arm64</span><span class="ps-label">已列平台</span></div>
    <div class="plat-stat"><span class="ps-val">Beta</span><span class="ps-label">当前 SDK</span></div>
  </div>
</div>

<ArmoryFetch pkg="libphytnic" command="armory get @nic_drv/phytium_nic_drv@1.0.4" detailHref="http://10.7.1.31/acohub/armory/package/nic_drv/phytium_nic_drv/1.0.4" />

## 产品简介

PHYTIUM 网卡是飞腾面向国产化计算平台推出的以太网网络适配器，适用于基于飞腾处理器的服务器、工作站、网络设备和工业控制等场景。该系列通常通过标准 PCIe 接口接入主机，网口形态覆盖 RJ45、SFP/SFP+ 以及 DAC 线缆等部署方式。

翼辉 PHYTIUM 网卡 SDK 基于 Linux 5.15 内核驱动移植开发，面向 SylixOS 提供已编译驱动库、依赖库、平台配置、补丁包及配套文档，用于在 BSP 中快速集成飞腾网卡驱动能力。

## 安装与加载

PHYTIUM 网卡驱动当前按静态库方式集成到 BSP，主要分为“添加并链接静态库”和“启动流程加载驱动”两个步骤。

### 添加静态库

驱动集成需要准备以下静态库：

| 静态库 | 作用 |
|--------|------|
| `libphytnic.a` | PHYTIUM 网卡驱动库 |
| `liblinuxcompat.a` | Linux 兼容层库 |
| `libdrv_net_compat.a` | 网卡兼容库 |
| `liblicense_device.a` | 翼辉授权库 |

其中 `libphytnic.a`、`liblinuxcompat.a`、`libdrv_net_compat.a` 随 SDK 提供；如 BSP 本身依赖授权库，需要从翼辉 Armory 获取 `V4.1.0` 及以上版本的 `liblicense_device.a`。

### 链接静态库

在 BSP 对应的 Makefile 中加入静态库依赖，并补充库文件所在路径：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -lphytnic \
    -llicense_device \
    -ldrv_net_compat \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...

LOCAL_DEPEND_LIB_PATH := \
    ... \
    /* 添加静态库所在路径 */ \
    ...
```

### 加载网卡驱动

驱动入口函数为：

```c
int phytmac_attach(void *reserved);
```

在 BSP 启动函数 `bspBoardNetifAttch` 中调用入口函数：

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int phytmac_attach(void *reserved);
    phytmac_attach(LW_NULL);
}
```

不论是单网卡还是多网卡场景，`phytmac_attach` 只需要调用一次。设备树版本会解析设备树并依次创建网卡；非设备树版本会根据当前硬件板卡平台默认创建全部网卡。

## 支持平台

<BoardTabs :boards="boards" />

## 支持情况

当前 SDK 资料中列出的平台支持如下：

| 架构 | 平台 | Release 支持 | Beta 支持 | 备注 |
|------|------|---------------|-----------|------|
| arm64 | FTD3000 | 暂未发布 | `v1.0.0-beta` | 飞腾平台网卡驱动支持 |

## 功能特性

PHYTIUM 网卡驱动支持以下能力：

- 支持链路自协商：`10/100 Mbps` 半/全双工，`1000 Mbps` 全双工。
- 支持混杂模式和组播模式。
- 支持 MAC 地址配置与使用。
- 网卡设备名称当前不支持修改。
- 基于 Linux 兼容层运行，兼容层加载方式可参考 Linux 兼容层使用教程。

## 驱动授权

PHYTIUM 网卡驱动需要完成授权后使用：

- 如果集成驱动的 BSP 已完成授权，网卡驱动可直接使用。
- 如果 BSP 尚未授权，需要先对 BSP 完成授权，再使用 PHYTIUM 网卡驱动。

## 查看驱动版本

驱动加载后，可通过以下命令查看 PHYTIUM 网卡驱动版本：

```bash
phyt_version
```

## 最新更新

<ChangelogEntry version="v1.0.0-beta" date="2026-06-01" type="minor">

- 新增基于 Linux 5.15 移植的 PHYTIUM 网卡驱动 SDK
- 新增 arm64 / FTD3000 平台 Beta 支持
- 提供静态库集成、驱动加载、授权和版本查看说明

</ChangelogEntry>

## 注意事项

<div class="issues">
  <div class="issue">
    <span class="issue-tag open">授权</span>
    <span>如 BSP 未完成授权，需要先完成 BSP 授权后再使用 PHYTIUM 网卡驱动。</span>
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
.plat-badge.beta { background: rgba(234,179,8,.12); color: #eab308; }
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
