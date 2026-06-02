# DesignWare 网卡驱动

DW 网卡（DesignWare Gigabit MAC）是由 Synopsys 授权、广泛集成于各类 SoC 的以太网控制器 IP。`翼辉网络部` 为 `SylixOS` 提供了一套统一的 DW 网卡驱动代码，通过 Armory 按平台分发固件包。

## 驱动特点

`翼辉网络部` 特意对所有使用 DW 网卡的平台代码进行了梳理和设计，以此实现：

- **代码高可靠**：一个问题修复，所有平台全部修复；
- **使用更便捷**：一个静态库，同一架构，`不挑 soc`，`不挑板卡`，`不挑是否设备树`，全通用！！！
- **功能更丰富**：支持`硬件卸载`，`硬件时间戳`。

## 支持平台

DW 网卡驱动已覆盖 `aarch64`、`arm`、`loongarch`、`MIPS`、`RISC-V` 等架构，支持 Rockchip、芯驰、算能、飞腾、FMQL、龙芯等多个平台。

完整支持清单请查看：[支持架构与平台](./platform-support)。

| 代表平台 | Armory 包 | 状态 |
|----------|-----------|------|
| RK3568 | `dw-gmac-rk3568` | ✅ 稳定 |
| RK3588 | `dw-gmac-rk3588` | ✅ 稳定 |
| 芯驰 D9 | `dw-gmac-d9` | ✅ 稳定 |
| LS2K1000 | `dw-gmac-ls2k1000` | ✅ 稳定 |

点击代表平台名称可查看板卡配置、网口映射和平台特有说明。

## 支持 PHY 芯片

| 厂家 | 支持型号 |
|------|----------|
| 通用 | C22 类型 PHY、C45 类型 PHY |
| Marvell | 88E1101、88E1112、88E1111、88E1111（Finisar）、88E1118、88E1121R、88E1318S、88E1145、88E1149R、88E1240、88E1116R、88E1510、88E1540、88E1545、88E3016、88E6341 Family、88E6390 Family、88E6393 Family、88E1340S、88E1548P |
| Qualcomm Atheros | AR8035、AR8030、AR8031/AR8033、AR8032、AR9331、QCA9561、8337、8327-A、8327-B、QCA8081 |
| Realtek | RTL8201CP、RTL8201F、RTL8208、RTL8211、RTL8211B、RTL8211C、RTL8211DN、RTL8211E、RTL8211F、RTL8211F-VD、Generic FE-GE、RTL8226、RTL8226B_RTL8221B、RTL8226-CG、RTL8226B-CG_RTL8221B-CG、RTL8221B-VB-CG、RTL8221B-VM-CG、RTL8366RB、RTL9000AA_RTL9000AN、RTL8365MB-VC |
| Motorcomm | YT8511、YT8521、YT8531、YT8531S、YT8522 |
| TI | DP83867 |
| 景略 | JL1xxx Fast Ethernet、JL2xxx Gigabit Ethernet |
| 联芸科技 | MAE0621A-Q2C、MAE0621A/B-Q3C(I) |
| 盛科 | CTC MARS1S、CTC MARS1S_V1、CTC MARS1P、CTC MARS1P_V1 |
| 凌耘微电子 | LY1210A 100M Ethernet、LY1211A_LY1211S Gigabit Ethernet、LY1241A_LY1241B Gigabit Ethernet |

## 下一步

- [快速开始 →](./getting-started)
- [支持架构与平台 →](./platform-support)
- [MII 总线二次开发 →](./mii-bus-development)
- [共用 MDIO 设备树配置 →](./shared-mdio)
- [常见问题分析 →](./faq)
- [更新日志 →](./changelog)
