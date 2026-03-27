# 更新日志

<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<ChangelogEntry version="1.8.2" date="2026-03-10" type="patch">

- 修复 MQTT 客户端在网络断开时重连逻辑死锁问题
- HTTP Server 优化大文件分块传输（chunked transfer）在低内存环境下的稳定性

</ChangelogEntry>

<ChangelogEntry version="1.8.0" date="2026-01-15" type="minor">

- 新增 CoAP 客户端（Beta），支持 CON/NON 消息类型
- MQTT 客户端升级支持 MQTT 5.0 协议
- NTP 客户端新增单次同步模式 `ntp_sync_once`

</ChangelogEntry>

<ChangelogEntry version="1.7.0" date="2025-10-22" type="minor">

- HTTP Client 新增 TLS/HTTPS 支持（依赖 mbedTLS）
- MQTT 客户端新增 TLS 加密连接支持
- Modbus TCP 新增写多个寄存器（FC16）支持

</ChangelogEntry>

<ChangelogEntry version="1.6.1" date="2025-08-05" type="patch">

- 修复 HTTP Server 在处理 POST 大 body 时内存泄漏
- 修复 Modbus TCP 在 slave 超时无响应时未正确释放连接

</ChangelogEntry>

<ChangelogEntry version="1.6.0" date="2025-06-18" type="minor">

- 新增 TFTP Server 组件，支持固件 OTA 升级场景
- HTTP Server 新增静态文件服务支持
- 所有组件统一错误码定义

</ChangelogEntry>

<ChangelogEntry version="1.0.0" date="2024-12-01" type="major">

- 首次发布：包含 MQTT 客户端、HTTP Server/Client、Modbus TCP 三个核心组件

</ChangelogEntry>
