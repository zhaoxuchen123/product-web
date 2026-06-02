# IgH EtherCAT 主站协议栈

IgH EtherCAT Master 是 EtherLab 提供的开源 EtherCAT 主站实现。本工程 `SylixOS_IgH` 基于 IgH 官方 Release 版本移植，当前适配版本为 `1.6.3`，面向 SylixOS 提供 EtherCAT 主站内核模块、实时以太网驱动、用户态开发库、命令行工具和伺服电机演示程序。

EtherCAT 是面向工业自动化的实时以太网技术，典型用于伺服控制、分布式 I/O、运动控制、机器人、测试测量和工业现场总线替代等场景。它以标准以太网帧为基础，通过主站周期性收发过程数据，实现高实时性和高同步精度的现场设备通信。

代码仓库：[SylixOS_IgH](http://10.7.100.21:8000/industry/IndustryMiddleWare/SylixOS_IgH/-/tree/v1.6.3)

## 工程组成

`SylixOS_IgH` 仓库可编译生成以下组件：

| 组件 | 说明 |
|------|------|
| `ec_master.ko` | EtherCAT 主站内核模块，负责主站状态机、从站扫描、过程数据调度和邮箱协议处理 |
| `ec_generic.ko` | 通用实时以太网驱动，用于将指定网卡接入 EtherCAT 主站 |
| `libethercat.so` | EtherCAT 应用开发库，提供 ECRT 用户态 API |
| `ethercat` | EtherCAT 命令行工具，用于查询主站、从站、PDO、SDO、域等信息 |
| `ec_motor_demo` / `servo_motor_demo` | 基于 CoolDriver Smart7 伺服驱动器的演示程序 |
| `/etc/ec_master.conf` | 主站配置文件，指定主站网卡 MAC 和调试等级 |

## 核心能力

当前 SylixOS IgH 移植版本具备以下能力：

- 支持 EtherCAT 主站功能。
- 支持多个从站扫描、状态监控和过程数据交换。
- 支持 CoE（CANopen over EtherCAT），可进行 PDO/SDO 配置和访问。
- 支持 EoE（Ethernet over EtherCAT），可为 EoE 从站创建虚拟网络接口。
- 提供 `libethercat.so`，支持用户态实时应用通过 ECRT API 开发 EtherCAT 控制程序。
- 提供 `ethercat` 命令行工具，用于主站诊断、从站查看、SDO 上传/下载等调试操作。
- 提供伺服电机 Demo，可用于快速验证 CoolDriver Smart7 类伺服驱动器。

## EtherCAT 通信模型

EtherCAT 网络通常由一个主站和多个从站组成。主站周期性发送以太网帧，帧经过每个从站时，从站在报文经过过程中读取属于自己的输出数据，并写入输入数据。该机制降低了多节点通信开销，适合周期性实时控制。

```text
EtherCAT Master ──► Slave 1 ──► Slave 2 ──► Slave 3 ──► ... ──► Master
```

常见数据类型：

| 类型 | 说明 |
|------|------|
| Process Data | 周期性过程数据，例如数字量 I/O、模拟量、伺服控制字、位置、速度等 |
| PDO | Process Data Object，用于描述周期过程数据映射 |
| SDO | Service Data Object，用于访问对象字典，常用于参数配置和诊断 |
| Domain | IgH 中的过程数据域，可将一组 PDO 映射到连续内存区域进行周期交换 |
| DC | Distributed Clocks，分布式时钟，用于高精度同步多个从站 |

## 典型工作流

IgH 主站应用通常包含两个阶段：初始化配置和周期运行。

### 初始化阶段

1. 通过 `ecrt_request_master()` 请求主站。
2. 通过 `ecrt_master_create_domain()` 创建过程数据域。
3. 通过 `ecrt_master_slave_config()` 获取从站配置句柄。
4. 通过 `ecrt_slave_config_pdos()` 配置 PDO 映射。
5. 通过 `ecrt_domain_reg_pdo_entry_list()` 注册 PDO entry 到过程数据域。
6. 如需 DC，同步配置参考时钟和从站时钟。
7. 通过 `ecrt_master_activate()` 激活主站。
8. 通过 `ecrt_domain_data()` 获取过程数据内存指针。

### 周期运行阶段

1. 调用 `ecrt_master_receive()` 接收主站数据。
2. 调用 `ecrt_domain_process()` 处理域数据。
3. 从过程数据内存读取输入 PDO。
4. 根据控制算法写入输出 PDO。
5. 调用 `ecrt_domain_queue()` 将域数据入队。
6. 调用 `ecrt_master_send()` 发送 EtherCAT 帧。

如果使用 DC，同步周期中通常还会调用 `ecrt_master_application_time()`、`ecrt_master_sync_reference_clock_to()` 和 `ecrt_master_sync_slave_clocks()`。

## 文档导航

- [快速开始](./quick-start) — 部署主站、加载模块、查看主从站状态和运行 Demo。
- [应用开发指南](./application-guide) — 介绍 ECRT API 使用流程、PDO/SDO、Domain 和周期任务结构。

## 参考资料

- [EtherLab IgH EtherCAT Master 仓库](https://gitlab.com/etherlab.org/ethercat)
- [IgH EtherCAT Master 官方文档 PDF](https://gitlab.com/etherlab.org/ethercat/-/jobs/artifacts/stable-1.5/raw/pdf/ethercat_doc.pdf?job=pdf)
- [EtherCAT Technology Group 技术介绍](https://www.ethercat.org/en/technology.html)
