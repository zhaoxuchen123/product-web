# FRRouting 配置与使用

FRRouting 的日常使用围绕 `vtysh` 展开。`vtysh` 提供统一显示视图和配置视图，可查看路由状态、协议状态，也可以修改并保存运行配置。

## 显示视图

在 SylixOS Shell 下执行：

```bash
vtysh
```

进入显示视图后，可以使用 `show` 命令查看状态，并通过 `Tab` 或 `?` 做命令联想。

常用查看命令：

```text
show running-config
show ip route
show ipv6 route
show interface
show ip ospf
show ip ospf neighbor
show bfd peers
```

| 命令 | 用途 |
|------|------|
| `show running-config` | 查看当前运行配置 |
| `show ip route` | 查看 IPv4 路由表 |
| `show ipv6 route` | 查看 IPv6 路由表 |
| `show interface` | 查看接口状态 |
| `show ip ospf neighbor` | 查看 OSPF 邻居状态 |
| `show bfd peers` | 查看 BFD 会话状态 |

## 配置视图

从显示视图进入配置视图：

```text
configure terminal
```

配置完成后可通过以下命令保存：

```text
write file
```

如果已经在启动前手动编辑 `/etc/frr/frr.conf` 和 `/etc/frr/zebra.conf`，并且配置满足业务需求，则启动后可以只进入显示视图检查运行状态；如果需要现场调整，再进入配置视图修改。

## OSPFv2 配置示例

下面示例演示一个基础 OSPFv2 配置流程。接口名、网段和 area 需要按现场网络规划调整。

```text
configure terminal
!
interface en1
 ip ospf area 0.0.0.0
!
router ospf
 ospf router-id 1.1.1.1
 network 192.168.10.0/24 area 0.0.0.0
!
end
write file
```

验证：

```text
show ip ospf neighbor
show ip route ospf
```

## OSPFv3 配置示例

IPv6 场景可使用 `ospf6d`：

```text
configure terminal
!
interface en1
 ipv6 ospf6 area 0.0.0.0
!
router ospf6
 ospf6 router-id 1.1.1.1
!
end
write file
```

验证：

```text
show ipv6 ospf6 neighbor
show ipv6 route ospf6
```

## BFD 配置思路

BFD 用于快速检测链路或邻居故障。SDK 使用文档说明，进入配置视图后输入 `bfd` 可进入 BFD 配置视图；OSPF 与 BFD 联动通常还需要在 OSPF 或接口配置中启用相关联动能力。

示例流程：

```text
configure terminal
!
bfd
 peer 192.168.10.2 interface en1
!
interface en1
 ip ospf bfd
!
end
write file
```

验证：

```text
show bfd peers
show ip ospf neighbor
```

::: tip 提示
BFD 和 OSPF 联动配置与 FRR 版本、编译选项和 SDK 启动组件有关。若命令联想中不存在某个关键字，请先确认 `bfdd` 已启动，并以实际 SDK 随包测试文档和 `vtysh ?` 输出为准。
:::

## 静态路由配置示例

静态路由适合固定路径转发或基础联通验证：

```text
configure terminal
ip route 10.10.0.0/16 192.168.10.254
end
write file
```

验证：

```text
show ip route static
```

## 常见检查项

| 现象 | 检查建议 |
|------|----------|
| `vtysh` 无法进入 | 检查 `mgmtd`、`zebra` 和目标协议进程是否已经启动 |
| 看不到 OSPF 邻居 | 检查接口 IP、area、链路连通性、MTU、两端 hello/dead interval |
| `show bfd peers` 无会话 | 检查 `bfdd` 是否启动，peer 地址和接口是否正确 |
| 配置保存后重启丢失 | 检查是否执行 `write file`，以及 `/etc/frr/frr.conf` 是否被正确写入 |
| 路由未下发 | 检查 `zebra` 是否运行，协议路由是否已经进入 FRR RIB |

## 参考资料

- [FRR Basic Setup](https://docs.frrouting.org/en/latest/setup.html)
- [FRR VTY shell](https://docs.frrouting.org/en/latest/vtysh.html)