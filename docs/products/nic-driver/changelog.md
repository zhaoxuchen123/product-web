# 更新日志

<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ChangelogEntry version="2.4.1" date="2025-12-15" type="patch">

- 修复 RTL8111 在高负载下偶发 DMA 描述符溢出问题
- 优化 i210 中断合并（ITR）参数默认值，减少低负载下 CPU 唤醒次数

</ChangelogEntry>

<ChangelogEntry version="2.4.0" date="2025-10-08" type="minor">

- 新增 Cadence GEM 控制器驱动支持（适用于 Xilinx Zynq 系列）
- 新增多队列（Multi-Queue）API，支持 RSS 接收分流
- 优化 DMA 描述符环形缓冲区管理，减少锁竞争

</ChangelogEntry>

<ChangelogEntry version="2.3.2" date="2025-08-21" type="patch">

- 修复 SMSC LAN9118 在 3.3V 供电下 PHY 初始化偶发失败
- 修复 `nic_recv` 在帧长恰好等于 MTU 时截断最后一字节的 bug

</ChangelogEntry>

<ChangelogEntry version="2.3.0" date="2025-06-10" type="minor">

- 新增轮询（polling）模式支持，适配无中断控制器环境
- 驱动接口新增 `nic_ioctl` 用于运行时参数调整
- 完善所有驱动的 PHY 自协商状态机

</ChangelogEntry>

<ChangelogEntry version="2.2.0" date="2025-03-05" type="minor">

- 新增 Intel i217 PCIe 千兆网卡驱动
- 统一各驱动的日志输出格式
- 增加驱动自测用例，覆盖率提升至 85%

</ChangelogEntry>

<ChangelogEntry version="2.0.0" date="2024-11-20" type="major">

- **破坏性变更**：重构驱动接口，`nic_init` 拆分为 `nic_open` / `nic_close`
- 引入设备树（DeviceTree）配置支持
- 支持 SMP 多核环境下的并发收发

</ChangelogEntry>
