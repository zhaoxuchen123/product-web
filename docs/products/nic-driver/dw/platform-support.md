# DesignWare 网卡支持架构与平台

本文汇总翼辉 DesignWare（DW）网卡驱动当前支持的 CPU 架构、芯片平台和已适配板卡。对于已沉淀详细说明的平台，可继续查看对应平台页面；其余平台可按 DW 通用集成方式接入。

## 支持概览

| 架构 | 平台 | 已适配板卡 |
|------|------|------------|
| aarch64 | RK3562 | — |
| aarch64 | RK3568 | AIO 官方板、EVB 官方板、Tronlong 官方板、ITOP 官方板、ADP 板卡、LubanCat |
| aarch64 | RK3576 | — |
| aarch64 | SemiDrive D9 | MYB-JD9X-I_V10、飞凌 |
| aarch64 | CV186AH | 算能 CV186AH 开发板 |
| aarch64 | RK3588 | Orange Pi 5、ITOP 官方板、EVB7 官方板、Tronlong 官方板 |
| aarch64 | KA200 | HS100 |
| aarch64 | FTD2000 | 汉为 FT-208-COM-B |
| aarch64 | FT2004 | 汉为 FT-204-COM-B |
| aarch64 | FMQL 100tai | FMQL 100tai |
| arm | FMQL | AG102 版本 |
| loongarch | LS2K2000 | 众达板卡 |
| loongarch | LS2K1000LA | 龙芯派 |
| loongarch | LS2K300 | 龙芯派 |
| loongarch | LS2K1500 | 龙芯派 |
| MIPS | m300 | — |
| MIPS | x2000 | — |
| RISC-V | sm90d325tnail | — |

## 已有详细平台页

以下平台已提供更详细的板卡配置、网口映射或 SoC 级说明：

- [RK3568](./platforms/rk3568)
- [RK3588](./platforms/rk3588)
- [芯驰 D9](./platforms/d9)
- [LS2K1000](./platforms/ls2k1000)

## 接入说明

- 同一架构下的 DW 网卡优先复用统一驱动库和通用集成流程。
- 新平台适配时，通常需要确认 MAC 控制器基地址、中断、时钟、PHY 接口模式、PHY 地址、reset GPIO 和 MDIO 关系。
- 如果多个网口共用 MDIO 总线，请参考：[共用 MDIO 设备树配置](./shared-mdio)。
- 如果需要在驱动外访问 PHY 寄存器或扩展 MDIO 调试功能，请参考：[MII 总线二次开发](./mii-bus-development)。

