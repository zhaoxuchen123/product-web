# ring-suit 快速开始

本文说明如何在 SylixOS 板卡上快速部署并启动 `ring-suit` 环网冗余套件。

## 前置条件

- 已准备支持多网口的 SylixOS 固件与目标板卡。
- 已获取 `ring-suit` 套件和对应 SylixOS 内核补丁包。
- 已确认目标板卡网口名称，例如 `en1`、`en2`。
- 同一环网只选择一种环网协议：RSTP、ERPS 或 MRP/MRC。

## 部署内核补丁

`ring-suit` 套件提供适配 SylixOS 3.6.5 LTS / ECS 的内核补丁包。将对应补丁放到 `libsylixos` 目录后执行：

```bash
patch -p1 < xxxx.patch
```

补丁用于补齐环网冗余所需的 bridge、端口控制、报文 hook 或协议联动能力。补丁完成后重新编译并部署对应 BSP / 系统镜像。

## 安装套件

### 手动安装

按套件目录结构将生成物上传到目标板卡的对应目录，例如：

```text
/lib/modules/rstp.ko
/lib/modules/erps.ko
/usr/bin/rstp-ctl
/usr/bin/erps-ctl
/usr/bin/mrc
/usr/lib/libmrp_service.so
/usr/lib/libpnet.so
/etc/ring/bridge.conf
/etc/ring/rstp.conf
/etc/ring/erps.conf
/etc/ring/mrc.conf
```

### Armory 安装

```bash
armory remote set default="remote://username:password@board_ip"
armory install @nic_drv/ring-suit
```

## 启动 RSTP

加载模块并按默认配置初始化：

```bash
insmod /lib/modules/rstp.ko
rstp-ctl init
```

默认配置文件为 `/etc/ring/rstp.conf`。也可以指定配置文件：

```bash
rstp-ctl init -f /etc/ring/rstp.conf
```

常用命令：

```bash
rstp-ctl status
rstp-ctl recompute
rstp-ctl tc
rstp-ctl deinit
```

| 命令 | 说明 |
|------|------|
| `status` | 查看 bridge、端口角色、端口状态和拓扑信息 |
| `recompute` | 触发 RSTP 重新计算端口角色和状态 |
| `tc` | 主动触发一次拓扑变化通知，用于测试 FDB 刷新和拓扑变化传播 |
| `deinit` | 销毁当前 RSTP 实例并释放内核侧 bridge / port 资源 |

## 启动 ERPS

加载模块并按默认配置初始化：

```bash
insmod /lib/modules/erps.ko
erps-ctl init
```

默认配置文件为 `/etc/ring/erps.conf`。也可以指定配置文件：

```bash
erps-ctl init -f /etc/ring/erps.conf
```

常用命令：

```bash
erps-ctl status
erps-ctl clear
erps-ctl ms en1
erps-ctl fs en1
erps-ctl fail en1
erps-ctl recover en1
erps-ctl deinit
```

| 命令 | 说明 |
|------|------|
| `status` | 查看环实例、节点角色、端口阻塞/故障状态、R-APS 状态和统计计数 |
| `clear` | 清除本地 MS/FS 等人工命令，或在 RPL owner 上恢复 RPL 阻塞状态 |
| `ms <port>` | 对指定端口发起 Manual Switch，用于人工切换业务路径 |
| `fs <port>` | 对指定端口发起 Forced Switch，用于强制切换业务路径 |
| `fail <port>` | 模拟指定端口故障，便于验证保护倒换 |
| `recover <port>` | 恢复由 `fail` 模拟的端口故障 |
| `deinit` | 销毁当前 ERPS 环实例并释放内核侧资源 |

## 启动 MRP/MRC

默认使用 `/etc/ring/mrc.conf` 启动 MRP Client：

```bash
mrc
```

指定配置文件和日志等级：

```bash
mrc --config /etc/ring/mrc.conf --log-level info
mrc --config /etc/ring/mrc.conf --log-level debug --mrp-log-file /tmp/mrp.log
```

| 参数 | 说明 |
|------|------|
| `--config <path>` | 指定 MRC 配置文件路径 |
| `--log-level off|error|info|debug` | 设置运行日志等级 |
| `--mrp-log-file <path>` | 将 MRP 日志写入指定文件 |
| `--no-mrp-log-file` | 关闭 MRP 文件日志，仅保留控制台输出 |

## 快速检查

启动后按以下顺序确认：

1. `ifconfig` 或系统命令确认 `en1` / `en2` 链路已 UP。
2. 确认 `/etc/ring/bridge.conf` 的 IP 与现场规划一致。
3. 使用对应协议的 `status` 命令查看端口角色和阻塞状态。
4. 断开一侧环网链路，观察业务是否恢复、FDB 是否刷新。
5. 恢复链路后根据协议配置确认是否回切。
