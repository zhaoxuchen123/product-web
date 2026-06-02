# IgH 快速开始

本文说明如何在 SylixOS 上快速部署 IgH EtherCAT 主站，完成主站模块加载、实时以太网驱动加载、主从站状态查看和伺服 Demo 验证。

## 准备条件

开始前请确认：

- 已完成 `SylixOS_IgH` 工程编译。
- 目标板卡具备可作为 EtherCAT 主站的以太网口。
- 已知主站网卡 MAC 地址。
- EtherCAT 从站已正确连接，例如 I/O 模块、伺服驱动器或 CoolDriver Smart7。
- 已部署以下文件到目标系统：
  - `/lib/modules/ec_master.ko`
  - `/lib/modules/ec_generic.ko`
  - `/lib/libethercat.so`
  - `/usr/bin/ethercat`
  - `/usr/bin/ec_motor_demo` 或 `/usr/bin/servo_motor_demo`
  - `/etc/ec_master.conf`

工程 `.reproject` 中已配置典型上传路径，可作为部署参考。

## 配置主站网卡

创建或修改 `/etc/ec_master.conf`，配置作为 EtherCAT 主站的网卡 MAC 地址：

```text
main_devices="xx:xx:xx:xx:xx:xx"
debug_level=0
```

参数说明：

| 参数 | 说明 |
|------|------|
| `main_devices` | 主站使用的以太网设备 MAC 地址，可通过系统网卡信息查询得到 |
| `debug_level` | 主站调试等级，常规使用保持 `0`，排查问题时再提高 |

示例配置：

```text
main_devices="02:ee:d9:32:35:5b"
debug_level=0
```

## 加载内核模块

先加载 EtherCAT 主站模块：

```bash
insmod /lib/modules/ec_master.ko
```

再加载通用实时以太网驱动：

```bash
insmod /lib/modules/ec_generic.ko
```

加载顺序建议保持为：

1. `ec_master.ko`
2. `ec_generic.ko`
3. 用户态应用或 Demo

## 查看主站状态

使用 `ethercat master` 查看主站状态：

```bash
ethercat master
```

常见关注项：

- 主站是否存在；
- 主站绑定的网卡是否正确；
- Link 是否正常；
- 从站数量是否符合预期；
- 主站是否处于可用状态。

## 查看从站信息

使用 `ethercat slaves` 查看当前总线扫描到的从站：

```bash
ethercat slaves
```

如果没有扫描到从站，可优先检查：

1. EtherCAT 网线连接顺序和供电状态。
2. `main_devices` 配置的 MAC 是否对应实际主站网口。
3. `ec_master.ko` 与 `ec_generic.ko` 是否加载成功。
4. 从站是否处于正常上电状态。

## 常用诊断命令

`ethercat` 命令行工具可用于查询主站、从站、PDO、SDO 和域信息。常用命令包括：

```bash
# 主站状态
ethercat master

# 从站列表
ethercat slaves

# 从站 PDO 信息
ethercat pdos

# 从站 SDO 字典
ethercat sdos

# 过程数据域
ethercat domains

# 重新扫描总线
ethercat rescan
```

实际支持命令可通过 `ethercat --help` 或对应版本命令帮助查看。

## 运行伺服 Demo

如果总线上接入 CoolDriver Smart7 伺服驱动器，可运行工程提供的 Demo 验证主站收发、PDO 映射和伺服控制流程：

```bash
ec_motor_demo
```

运行前建议先确认：

- 从站列表中能看到目标伺服驱动器；
- Vendor ID、Product Code 与 Demo 中配置一致；
- 伺服驱动器供电、使能和安全回路满足运行条件；
- Demo 的从站位置与实际环网位置一致。

## EoE 功能

工程配置中 `EC_EOE_ENABLE = yes` 表示启用 EoE（Ethernet over EtherCAT）相关能力。对于支持 EoE 的从站，主站可创建虚拟网络接口，用于通过 EtherCAT 网络承载普通以太网通信。

EoE 场景需要额外配置虚拟接口 IP、路由或桥接策略。更多细节可参考工程中的 `README.EoE`。

## 常见问题

**加载模块后没有主站**

- 检查 `/etc/ec_master.conf` 是否存在。
- 检查 `main_devices` 中 MAC 地址是否正确。
- 检查 `ec_master.ko` 是否先于 `ec_generic.ko` 加载。

**扫描不到从站**

- 检查网线连接、从站供电和从站顺序。
- 确认使用的是 EtherCAT 端口，而不是普通交换网络端口。
- 使用 `ethercat rescan` 重新扫描。

**Demo 无法运行**

- 检查 `libethercat.so` 是否部署到 `/lib`。
- 检查从站型号、位置、PDO 映射是否与 Demo 一致。
- 检查应用是否具备访问 EtherCAT 主站字符设备的权限。

