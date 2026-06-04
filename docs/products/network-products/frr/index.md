# FRRouting · 动态路由套件

`FRRouting`（FRR）是面向 SylixOS 的动态路由协议套件产品。翼辉 FRRouting SDK 基于 FRR v10.2 移植，当前 SDK 版本为 `v1.0.0`，用于在 SylixOS 设备上提供三层路由、动态路由协议、链路检测和统一命令行配置能力。

FRR 适合需要路由协议互通、链路故障检测、路由自动收敛和复杂三层组网的工业网关、边缘控制器、车载网关、通信设备和多网口网络产品。

## Armory 获取

<div class="armory-card">
  <div class="armory-card-title">从 Armory 获取 FRRouting SDK</div>
  <p>根据目标板卡远端地址安装 FRRouting 套件。包名和链接可按实际 Armory 发布信息调整：</p>

```bash
armory remote set default="remote://username:password@board_ip"
armory install @nic_drv/frr
```

  <p class="armory-card-link">详细内容参考：<a href="TODO: 请填写 FRRouting Armory 包详情链接" target="_blank" rel="noopener noreferrer">FRRouting Armory 包详情</a></p>
</div>

## 能力概览

| 能力 | 说明 | 典型场景 |
|------|------|----------|
| OSPFv2 / OSPFv3 | 通过 `ospfd`、`ospf6d` 提供 IPv4 / IPv6 链路状态路由 | 工业园区网、控制器多网段互联、IPv6 路由验证 |
| BFD | 通过 `bfdd` 提供快速链路故障检测，可与路由协议联动 | 主备链路快速切换、OSPF 邻居故障快速感知 |
| Static Route | 通过 `staticd` 管理静态路由 | 简单三层网关、固定路径转发 |
| Zebra | 作为路由管理中间层，协调协议进程和系统路由表 | 多协议路由汇聚、路由下发与同步 |
| vtysh | 提供类网络设备 CLI 的统一显示视图和配置视图 | 现场调试、配置保存、协议状态查看 |
| YANG 数据 | SDK 随带 `.yang` 数据模型文件 | 后续北向管理、配置模型扩展 |

::: tip 说明
FRRouting 官方项目支持 BGP、OSPF、RIP、IS-IS、PIM、LDP、BFD、Babel、PBR、OpenFabric、VRRP 等多类协议。SylixOS FRRouting SDK 当前交付内容以 `ospfd`、`ospf6d`、`bfdd`、`staticd`、`zebra`、`mgmtd`、`vtysh` 等组件为主，具体可用协议以实际 SDK 包为准。
:::

## SDK 组成

| 目录 / 文件 | 内容 |
|-------------|------|
| `rootfs/bin/` | `bfdd`、`mgmtd`、`ospfd`、`ospf6d`、`staticd`、`vtysh`、`zebra` 等应用程序 |
| `rootfs/etc/` | `startup.sh`、`/etc/frr/frr.conf`、`/etc/frr/zebra.conf` 等启动和初始配置文件 |
| `rootfs/lib/` | `libfrr.so`、`libpcre2.so`、`libyang.so`、`libreadline.so` 等运行依赖库 |
| `rootfs/usr/local/yang/` | FRR 所需的 `.yang` 数据模型文件 |
| `patch/` | SylixOS 内核相关优化补丁 |
| `reports/` | FRR 功能测试报告 |

## 工作流

1. 将 `rootfs` 中的文件按同名路径部署到 SylixOS 设备。
2. 按业务需要确认 `/etc/frr/frr.conf`、`/etc/frr/zebra.conf` 和启动脚本。
3. 通过 `/etc/startup.sh` 自动启动，或参考脚本手动启动相关 FRR 进程。
4. 使用 `vtysh` 进入显示视图查看状态，必要时进入配置视图完成协议配置。
5. 保存配置到 `/etc/frr/frr.conf`，并在重启前确认必要守护进程已经启动。

## 文档导航

- [快速开始](./quick-start)：部署 SDK、启动 FRR 并进入 `vtysh`。
- [软件架构](./architecture)：说明 FRR 多进程、事件循环、Zebra 和 VTYSH 的关系。
- [配置与使用](./configuration)：说明显示视图、配置视图、OSPF / BFD 常用配置流程。

## 参考资料

- [FRRouting Project](https://frrouting.org/)
- [FRR Basic Setup](https://docs.frrouting.org/en/latest/setup.html)
- [FRR VTY shell](https://docs.frrouting.org/en/latest/vtysh.html)

<style>
.armory-card {
  margin: 1rem 0 2rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,197,94,.05));
}
.armory-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}
.armory-card p {
  margin: 0.45rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.armory-card-link a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>