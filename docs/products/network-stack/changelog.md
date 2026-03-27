# 更新日志

<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ChangelogEntry version="3.1.0" date="2026-01-20" type="minor">

- 新增 DHCPv6 客户端（RFC 8415）支持
- TCP 拥塞控制算法新增 CUBIC 选项，可运行时切换
- 优化 IPv6 路由表查找，减少 30% 平均查找时延
- 修复 TCP TIME_WAIT 状态下端口复用偶发失败

</ChangelogEntry>

<ChangelogEntry version="3.0.1" date="2025-11-30" type="patch">

- 修复 DNS 解析器在响应包含多条 CNAME 记录时死循环问题
- 修复 TCP keepalive 探针计数器未正确重置导致连接提前断开

</ChangelogEntry>

<ChangelogEntry version="3.0.0" date="2025-09-15" type="major">

- **重大更新**：正式支持 IPv6 全特性（地址自动配置 SLAAC、邻居发现 NDP）
- Socket API 完整兼容 POSIX.1-2017
- 内部缓冲区管理重构，内存碎片率降低 40%
- 新增 `netif_set_mtu` 支持 Jumbo Frame

</ChangelogEntry>

<ChangelogEntry version="2.5.0" date="2025-06-01" type="minor">

- 新增 mDNS 基础查询支持（Responder 功能待后续版本）
- UDP 广播/多播收发优化
- 新增网络统计接口 `netstack_stats_get`

</ChangelogEntry>

<ChangelogEntry version="2.4.0" date="2025-02-18" type="minor">

- 新增 DHCP Option 60/61 支持
- TCP 窗口扩大选项（Window Scaling）默认开启
- 优化 ARP 表老化机制，减少不必要的 ARP 广播

</ChangelogEntry>
