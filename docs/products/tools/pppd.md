<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / pppd</div>
    <h1 class="plat-title">pppd</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS PPP 拨号服务器</p>
    <VersionBadge product="tools/pppd" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">PPPoS</span><span class="ps-label">协议</span></div>
    <div class="plat-stat"><span class="ps-val">PAP/CHAP</span><span class="ps-label">认证</span></div>
    <div class="plat-stat"><span class="ps-val">IPv4/6</span><span class="ps-label">双栈</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`pppd` 是基于 SylixOS lwIP 网络协议栈的 PPP 拨号服务器守护进程，支持串口 PPP（PPPoS）连接，提供 PAP/CHAP 认证、自动重连和后台运行能力。

## 前置条件

使用前需在 SylixOS 内核中启用 PPP 服务器支持，编辑 `libsylixos/SylixOS/net/lwip/lwip_config.h`：

```c
#define PPP_SERVER   1
#define PPP_SUPPORT  1
#define PPPOS_SUPPORT 1
#define PPP_AUTH_SUPPORT 1  /* PAP/CHAP 认证 */
```

修改后需重新编译 SylixOS base 工程。

## 命令行参数

### 必需参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `-d <device>` | 串口设备路径 | `/dev/ttyS3` |
| `-b <baud>` | 波特率 | `115200` |
| `-l <ip>` | 服务器本地 IP | `192.168.100.1` |
| `-r <ip>` | 客户端远程 IP | `192.168.100.2` |

### 可选参数

| 参数 | 说明 |
|------|------|
| `-u <user>` | 认证用户名 |
| `-p <pass>` | 认证密码 |
| `-L <level>` | 日志级别：`error`/`warn`/`info`/`debug` |
| `-v` | 显示版本 |
| `-h` | 显示帮助 |

## 使用示例

```bash
# 不带认证，后台运行
pppd -d /dev/ttyS3 -b 115200 -l 192.168.100.1 -r 192.168.100.2 &

# 带 PAP/CHAP 认证
pppd -d /dev/ttyS3 -b 115200 -l 192.168.100.1 -r 192.168.100.2 -u testuser -p 123456 &

# 开启调试日志
pppd -d /dev/ttyS3 -b 115200 -l 192.168.100.1 -r 192.168.100.2 -L debug &

# 查看进程
ps | grep pppd

# 停止服务
kill -n 15 $(cat /var/run/pppd.pid)
```

## Linux 客户端配置

创建 `/etc/ppp/peers/sylixos`：

```
/dev/ttyUSB0
115200
lock
noauth
nocrtscts
local
192.168.100.2:192.168.100.1
connect /bin/true
```

连接：

```bash
sudo pppd call sylixos
```

## 常见问题

**提示 "The remote system is required to authenticate itself"**
在 peers 配置文件中添加 `noauth`。

**Ctrl+C 无法停止**
pppd 是守护进程，使用 `kill -15 <pid>` 停止。

**PPP 服务器模式不工作**
检查内核 `PPP_SERVER` 宏是否为 `1` 并重新编译。

## 最新更新

<ChangelogEntry version="1.1.0" date="2025-12-11" type="minor">

- 初始版本发布
- 支持 PPPoS 串口连接
- 支持 PAP/CHAP 认证
- 支持 IPv4/IPv6 双栈
- 自动重连机制

</ChangelogEntry>

<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
