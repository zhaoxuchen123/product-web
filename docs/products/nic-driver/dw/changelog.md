# 更新日志

<script setup>
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

DW 网卡更新记录如下：

<ChangelogEntry version="3.0.21-beta" date="2026-04-09" :type="['minor']">

- **新增** DW 网卡支持低功耗模式

</ChangelogEntry>

<ChangelogEntry version="3.0.20" date="2026-04-07" :type="['minor']">

- **新增** DW 网卡支持 ifethtool 功能

</ChangelogEntry>

<ChangelogEntry version="3.0.19" date="2026-03-23" :type="['minor']">

- **新增** timestamp 驱动固件改用仅支持 PTP 功能的定制内核编译
- **新增** `[6a1a5699]` RISC-V（SM90D325）和 MIPS32（M300、X2000）平台 DW 网卡驱动支持
- **更新** `[c1692381]` netcompat 子系统更新至 1.0.5，新增 Mars PHY 驱动

</ChangelogEntry>

<ChangelogEntry version="3.0.18" date="2025-12-27" :type="['minor', 'patch']">

- **新增** `[5d737a35]` RK3562 平台 DW 网卡驱动支持
- **修复** `[aedb2324]` 灵犀 HS100 执行 `ifup` / `ifdown` 后网卡无法恢复使用的问题
- **新增** `[9ee52845]` netcompat 子系统新增 YT8522 和 MAE PHY 驱动

</ChangelogEntry>

<ChangelogEntry version="3.0.17" date="2025-11-27" :type="['minor', 'patch']">

- **新增** 软件包新增基于「时间戳定制版 SylixOS 内核」编译的 timestamp 版本驱动
- **新增** 驱动支持通过环境变量 `dwmac_debug_level` 设置日志输出级别
- **更新** net_compat 库中 RTL8211F PHY 驱动新增 LED 灯控制支持
- **修复** `[7ba1c554]` 芯驰 D9 不支持 clk 接口，需在 BSP 网卡设备树中添加 `semidrive-ptp-ref` 节点以配置 PTP 参考频率

</ChangelogEntry>
