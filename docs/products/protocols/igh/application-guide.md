# IgH 应用开发指南

IgH 应用开发主要围绕 ECRT API 展开。应用通过 `libethercat.so` 请求主站、配置从站、建立过程数据域，并在周期任务中完成 PDO 输入输出交换。

本文结合 `SylixOS_IgH` 仓库中的 `examples/user/main.c`、`examples/mini/mini.c` 和 `examples/servo_motor_demo/main.c` 总结常见开发流程。

## 基本对象

| 对象 | 类型 | 说明 |
|------|------|------|
| Master | `ec_master_t` | EtherCAT 主站对象，负责总线收发、状态机和从站管理 |
| Domain | `ec_domain_t` | 过程数据域，用于组织一组 PDO entry 并映射到连续内存 |
| Slave Config | `ec_slave_config_t` | 从站配置对象，用于配置 PDO、SDO、DC、状态超时等 |
| Process Data | `uint8_t *` | `ecrt_domain_data()` 返回的过程数据内存指针 |

## 初始化流程

典型初始化代码结构如下：

```c
#include "ecrt.h"

static ec_master_t *master;
static ec_domain_t *domain;
static uint8_t *domain_pd;

int ethercat_init(void)
{
    master = ecrt_request_master(0);
    if (!master) {
        return -1;
    }

    domain = ecrt_master_create_domain(master);
    if (!domain) {
        return -1;
    }

    /* 1. 获取从站配置 */
    /* 2. 配置 PDO */
    /* 3. 注册 PDO entry */
    /* 4. 可选：配置 DC / SDO */

    if (ecrt_master_activate(master)) {
        return -1;
    }

    domain_pd = ecrt_domain_data(domain);
    if (!domain_pd) {
        return -1;
    }

    return 0;
}
```

## 从站配置

通过 `ecrt_master_slave_config()` 获取目标从站配置句柄。通常需要提供从站位置、Vendor ID 和 Product Code。

```c
ec_slave_config_t *sc;

sc = ecrt_master_slave_config(master,
                              0,        /* alias */
                              1,        /* position */
                              VENDOR_ID,
                              PRODUCT_CODE);
if (!sc) {
    return -1;
}
```

从站位置应与 `ethercat slaves` 输出的环网位置一致。开发 Demo 时建议先用命令行确认 Vendor ID、Product Code 和从站顺序。

## PDO 配置与注册

使用 `ecrt_slave_config_pdos()` 配置从站 PDO 映射：

```c
if (ecrt_slave_config_pdos(sc, EC_END, slave_syncs)) {
    return -1;
}
```

随后将 PDO entry 注册到 Domain：

```c
if (ecrt_domain_reg_pdo_entry_list(domain, domain_regs)) {
    return -1;
}
```

注册成功后，应用通过偏移量访问 `domain_pd` 中对应输入输出数据。

## 周期任务

周期任务负责接收 EtherCAT 帧、处理输入数据、写入输出数据并发送下一周期报文。

```c
void ethercat_cycle(void)
{
    ecrt_master_receive(master);
    ecrt_domain_process(domain);

    /* 读取输入 PDO */
    /* input = EC_READ_U16(domain_pd + input_offset); */

    /* 写入输出 PDO */
    /* EC_WRITE_U16(domain_pd + output_offset, output); */

    ecrt_domain_queue(domain);
    ecrt_master_send(master);
}
```

周期时间应根据从站能力、控制算法和总线规模设计。运动控制场景通常需要固定周期和稳定调度。

## 分布式时钟（DC）

伺服控制等高同步精度场景通常需要 DC。示例中常见调用包括：

```c
ecrt_master_application_time(master, app_time_ns);
ecrt_master_sync_reference_clock_to(master, app_time_ns);
ecrt_master_sync_slave_clocks(master);
```

使用 DC 时建议关注：

- 选择合适的参考时钟；
- 周期任务时间基准是否稳定；
- 从站是否支持 DC；
- 同步周期、偏移和应用周期是否与从站配置一致。

## SDO 与 CoE

IgH 支持 CoE（CANopen over EtherCAT）。应用可通过 SDO 在启动阶段或运行阶段访问对象字典，用于参数配置和诊断。

常见用途：

- 配置伺服模式、限位、速度、加速度等参数；
- 读取错误码或状态对象；
- 调整从站厂家扩展参数；
- 在调试阶段验证对象字典内容。

命令行也可通过 `ethercat upload`、`ethercat download` 等命令进行 SDO 上传/下载，具体以当前工具帮助为准。

## 状态监控

应用中建议周期性监控 Master、Domain 和 Slave Config 状态：

```c
ec_master_state_t master_state;
ec_domain_state_t domain_state;
ec_slave_config_state_t slave_state;

ecrt_master_state(master, &master_state);
ecrt_domain_state(domain, &domain_state);
ecrt_slave_config_state(sc, &slave_state);
```

监控内容包括：

- 主站 Link 状态；
- 从站数量和状态；
- Domain 工作计数器；
- 从站 AL 状态；
- 配置是否完成、是否进入 OP。

## 开发建议

- 先通过 `ethercat slaves`、`ethercat pdos`、`ethercat sdos` 确认从站信息，再编写应用。
- PDO 映射应与从站 ESI/对象字典一致，避免偏移错误。
- 输出控制字、目标位置、目标速度等数据前，应确认从站状态机已进入可操作状态。
- 关键控制场景建议启用 DC，并确保周期任务调度稳定。
- 对于伺服 Demo，重点核对 Vendor ID、Product Code、从站位置和 PDO 映射。
- 调试阶段可提高 `debug_level`，稳定后恢复为 `0`。

