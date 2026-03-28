# 快速开始

## 1. 从 Armory 下载固件包

通过以下命令从 **Armory** 平台下载驱动固件包：

```bash
armory get @nic_drv/dw_nic_drv@[版本号]
```

详细内容参考：[DW 网卡驱动](http://10.7.1.31/acohub/armory/org/package/nic_drv/dw_nic_drv/)。

## 2. 添加并链接静态库

### 添加静态库

DW 网卡驱动包含 3 个静态库，根据目标架构平台将其添加到 BSP 工程：

| 库文件 | 说明 |
|--------|------|
| `libstmicro.a` | DW 网卡驱动库 |
| `liblinuxcompat.a` | Linux 兼容层库 |
| `libdrv_net_compat.a` | 网卡兼容库 |

### 链接静态库

修改 BSP 对应的 Makefile，加入以下链接依赖：

```makefile
LOCAL_DEPEND_LIB := \
    ... \
    -lstmicro \
    -ldrv_net_compat \
    -Wl,--whole-archive \
    -llinuxcompat \
    -Wl,--no-whole-archive \
    ...

LOCAL_DEPEND_LIB_PATH := \
    ...  /* 静态库所在路径 */ \
    ...
```

> **注意：** `liblinuxcompat.a` 必须用 `--whole-archive` 包裹，否则链接时符号会被丢弃。

## 3. 加载网卡驱动

DW 网卡驱动入口函数为：

```c
int dwmac_attach(void *reserved);
```

在 SylixOS BSP 启动函数 `bspBoardNetifAttch` 中调用一次即可：

```c
VOID bspBoardNetifAttch(VOID)
{
    extern int dwmac_attach(void *reserved);
    dwmac_attach(LW_NULL);
}
```

> - Linux 兼容层的加载可参考 Linux 兼容层使用教程；
> - 无论单网卡还是多网卡，`dwmac_attach` 只需调用一次。设备树版本会自动解析设备树依次创建网卡；非设备树版本则根据当前硬件平台默认创建所有网卡。

## 4. 非设备树版本定制配置

非设备树版本 BSP 默认使用驱动内置的 dts 配置，一个静态库可满足同一架构下不同 CPU、不同 BSP 类型的需求。

若需要定制化网卡配置，可使用 Armory 包 `tools/` 目录下的脚本 `dw_nodevtree_helper.sh`：

1. 修改 `tools/` 下的 dts 模板，按需调整网卡参数；
2. 运行脚本，将 dts 编译为含二进制数组的 `.h` 头文件；
3. 在 BSP 中引用头文件，并将数组传入 `dwmac_attach`：

```c
#include "dw_dtb.h"  /* 脚本生成的头文件 */

VOID bspBoardNetifAttch(VOID)
{
    extern int dwmac_attach(void *reserved);
    dwmac_attach(dw_dtb_data);  /* 传入自定义 dtb 数组 */
}
```

## 5. 查看驱动版本

驱动加载后，可通过 SylixOS Shell 命令查看当前版本：

```bash
dw_version
```
