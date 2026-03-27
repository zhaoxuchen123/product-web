# 更新日志

<script setup>
import ChangelogEntry from '../../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

DW GMAC 驱动各平台包独立版本，以下按发布时间倒序列出各包的更新记录。

## dw-gmac-rk3568

<ChangelogEntry version="1.2.0" date="2025-12-10" type="minor">

- 新增 YT8531 PHY 支持（RGMII_RXID 模式）
- 修复 100M 半双工模式下偶发自协商超时

</ChangelogEntry>

<ChangelogEntry version="1.1.0" date="2025-09-05" type="minor">

- 新增 PTP 硬件时间戳支持
- 优化 RGMII TX/RX delay 默认配置

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-06-01" type="major">

- 首次发布

</ChangelogEntry>

## dw-gmac-rk3588

<ChangelogEntry version="1.1.0" date="2025-11-20" type="minor">

- 新增 RSS 多队列接收分流支持（4 收队列）
- 修复双网口同时满速时 GMAC1 RX FIFO 偶发溢出，限速至 950 Mbps

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-07-15" type="major">

- 首次发布，支持 GMAC0 / GMAC1 双网口

</ChangelogEntry>

## dw-gmac-d9

<ChangelogEntry version="1.0.1" date="2025-10-30" type="patch">

- 修复 TJA1103 冷启动偶发自协商失败，增加 50ms 上电延迟

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-08-01" type="major">

- 首次发布，支持 ASIL-B 功能安全监控和 AVB Credit-Based Shaper

</ChangelogEntry>

## dw-gmac-ls2k1000

<ChangelogEntry version="1.0.1" date="2025-09-18" type="patch">

- 修复大端模式 DMA 描述符字节序解析错误

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2025-07-01" type="major">

- 首次发布，支持 MIPS64 大端字节序

</ChangelogEntry>
