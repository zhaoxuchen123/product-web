# FRRouting 快速开始

本文说明如何在 SylixOS 设备上部署并启动 FRRouting SDK，并通过 `vtysh` 完成基础检查。

## 前置条件

- 已获取适配目标架构和 SylixOS 内核版本的 FRRouting SDK。
- 目标设备网络接口、IP 地址和路由规划已经确定。
- 已确认是否需要应用 SDK 中的 SylixOS 内核优化补丁。
- 已准备文件上传方式，例如 FTP、SCP、TFTP 或 Armory 远端安装流程。

## 部署 rootfs

SDK 中的 `rootfs` 对应 SylixOS 设备根目录。手动部署时，将各目录内容上传到目标设备同名路径：

```text
rootfs/bin/*              -> /bin/
rootfs/etc/startup.sh     -> /etc/startup.sh
rootfs/etc/frr/*          -> /etc/frr/
rootfs/lib/*.so           -> /lib/
rootfs/usr/local/yang/*   -> /usr/local/yang/
```

常见组件包括：

| 组件 | 作用 |
|------|------|
| `mgmtd` | 管理守护进程，负责配置管理相关能力 |
| `zebra` | 路由管理中间层，协调协议进程和系统路由表 |
| `ospfd` | OSPFv2 协议进程 |
| `ospf6d` | OSPFv3 协议进程 |
| `staticd` | 静态路由进程 |
| `bfdd` | BFD 链路检测进程 |
| `vtysh` | 统一命令行入口 |

::: warning 注意
上传库文件后，若系统对动态库路径有额外要求，需要确认 `/lib` 中的依赖能够被 FRR 进程加载。部署补丁前请先确认补丁适配当前 SylixOS 内核版本。
:::

## 启动 FRR

### 方式一：使用启动脚本

SDK 提供的 `/etc/startup.sh` 包含 FRR 组件启动命令。默认情况下，`mgmtd` 和 `zebra` 是基础组件，其他协议进程通常按业务需求启用。

```bash
sh /etc/startup.sh
```

如果需要启用 OSPF、BFD 或静态路由，请编辑 `/etc/startup.sh`，取消对应进程启动命令的注释，并保持基础组件优先启动。

### 方式二：手动启动

调试阶段可以参考 `/etc/startup.sh` 手动启动各进程。典型顺序如下：

```bash
mgmtd -d
zebra -d
staticd -d
ospfd -d
ospf6d -d
bfdd -d
```

实际命令参数以 SDK 随包脚本为准。若只验证 OSPFv2，可先启动 `mgmtd`、`zebra`、`ospfd`；若需要 BFD 联动，再启动 `bfdd`。

## 进入 vtysh

FRR 启动后，在 SylixOS Shell 中执行：

```bash
vtysh
```

进入后可先查看基础状态：

```text
show running-config
show ip route
show interface
show ip ospf neighbor
show bfd peers
```

`vtysh` 提供显示视图和配置视图。显示视图下可输入 `show` 后使用 `Tab` 或 `?` 联想命令；需要修改配置时进入配置视图：

```text
configure terminal
```

## 保存配置

完成配置后建议保存到 `/etc/frr/frr.conf`：

```text
write file
```

FRR 官方文档说明，`vtysh` 会把多个守护进程的配置合并写入统一的 `frr.conf`。保存前应确认相关守护进程正在运行，否则未运行进程的配置可能无法被收集。

## 验证清单

- `/bin` 下可执行文件存在，且具备执行权限。
- `/lib` 下依赖库完整。
- `/etc/frr/frr.conf`、`/etc/frr/zebra.conf` 存在并符合业务配置。
- `mgmtd`、`zebra` 已启动，所需协议进程已启动。
- `vtysh` 可以进入，`show ip route` 能看到路由表。
- OSPF / OSPF6 / BFD 等协议状态与组网预期一致。