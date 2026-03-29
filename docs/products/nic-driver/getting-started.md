# 快速开始

网卡驱动库覆盖多个系列，安装方式和依赖包各不相同，请根据目标平台选择对应的入门指南：

## DesignWare GMAC 系列

适用于 RK3568、RK3588、芯驰 D9、LS2K1000 等集成 DW GMAC IP 的 SoC 平台。

一套驱动代码，通过 Armory 按平台分发固件包。

[→ DW GMAC 快速开始](./dw/getting-started)

## Intel PCIe 系列

适用于 Intel i210 / i211 / i350（igb）、I225 / I226（igc）、X710 / XL710（i40e）等 PCIe 网卡。

各驱动包独立，直接从 Armory 安装对应包即可。

[→ igb 快速开始](./intel/igb)
[→ igc 快速开始](./intel/igc)
[→ i40e 快速开始](./intel/i40e)

## 裕太微系列（MOTORCOMM）

适用于裕太微 YT6801 2.5GbE PCIe 网卡。

[→ YT6801 快速开始](./yt6801)

## 网讯系列（Wangxun）

适用于网讯科技 WX1860（千兆）和 WX1820（万兆）PCIe 网卡，支持静态库和 .ko 两种方式。

[→ ngbe（WX1860）快速开始](./wangxun/ngbe)
[→ txgbe（WX1820）快速开始](./wangxun/txgbe)

## 沐创系列（MUCSE）

适用于沐创 N10 / N10C 和 N500 万兆 PCIe 网卡，以 .ko 内核模块方式加载。

[→ rnp（N10）快速开始](./mucse/rnp)
[→ rnp500（N500）快速开始](./mucse/rnp500)
