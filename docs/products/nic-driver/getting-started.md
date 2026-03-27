# 快速开始

网卡驱动库包含两个独立的驱动系列，安装方式和依赖包各不相同，请根据目标平台选择对应的入门指南：

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
