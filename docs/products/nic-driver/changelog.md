# 网卡驱动库 · 更新日志

<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ChangelogEntry version="HEAD" pkg="ngbe · WX1860" date="2026-03-06" type="minor">

- 新增单播 / 组播地址过滤功能
- 新增 Shell 命令支持读写 PHY 寄存器
- 修复 pbuf 链接收时无法释放的问题
- 修复不支持软件 VLAN 的问题

</ChangelogEntry>

<ChangelogEntry version="1.3.6.9" pkg="txgbe · WX1820" date="2025-11-06" type="patch">

- 修复 SR-IOV 场景 VF 混杂模式下跨 VLAN 收包问题
- 修复 `ethtool -K rx-all on` 错误开启混杂模式
- 修复 QinQ 双层 VLAN 报文导致 TX 单元挂起

</ChangelogEntry>

<ChangelogEntry version="1.2.6.5" pkg="ngbe · WX1860" date="2025-11-21" type="patch">

- 修复 pbuf 链在 ifup/ifdown 时无法释放的问题

</ChangelogEntry>

<ChangelogEntry version="1.0.2" pkg="yt6801 · 裕太微" date="2025-10-01" type="minor">

- 新增 2.5GbE PCIe 网卡驱动支持

</ChangelogEntry>

<ChangelogEntry version="0.2.5" pkg="rnp · 沐创 N10" date="2025-10-27" type="minor">

- 初始版本发布，支持沐创 N10 / N10C 万兆网卡
- 支持 SR-IOV 虚拟化与 RSS 多队列分流

</ChangelogEntry>

<ChangelogEntry version="0.2.5" pkg="rnp500 · 沐创 N500" date="2025-10-27" type="minor">

- 初始版本发布，支持沐创 N500 万兆网卡
- 支持 RSS 多队列分流

</ChangelogEntry>

<ChangelogEntry version="5.18.7" pkg="igb · Intel" date="2025-09-10" type="patch">

- 优化 i210 中断合并（ITR）参数默认值，减少低负载下 CPU 唤醒次数
- 修复 i350 多口场景下偶发枚举顺序错乱问题

</ChangelogEntry>

<ChangelogEntry version="2.28.6" pkg="i40e · Intel" date="2025-07-15" type="patch">

- 修复 X710 在高流量下 TX 队列偶发 hang 问题
- 优化 SR-IOV VF 初始化流程，减少 mailbox 超时概率

</ChangelogEntry>

<ChangelogEntry version="3.0.19" pkg="DW GMAC" date="2025-06-20" type="minor">

- RK3568 新增 TSO 硬件卸载支持
- RK3588 优化多核 RSS 分流，吞吐提升约 15%
- 芯驰 D9 完善 ASIL-B 功能安全相关初始化流程
- LS2K1000 修复 RGMII 时序配置在低温下偶发链路不稳问题

</ChangelogEntry>

<ChangelogEntry version="3.0.0" pkg="DW GMAC" date="2024-11-20" type="major">

- 重构驱动架构，统一 RK3568 / RK3588 / 芯驰 D9 / LS2K1000 代码路径
- 引入设备树（DeviceTree）平台配置支持
- 支持 SMP 多核并发收发，新增 `nic_ioctl` 运行时参数调整接口

</ChangelogEntry>
