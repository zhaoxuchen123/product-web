# ring-suit 收敛测试

`ring_conv` 是 `ring-suit` 源码中提供的 PC 侧环网收敛测试工具，位于 `tools/convergence/ring_conv`。它通过固定频率 UDP 序号流统计倒换期间的最大连续丢包和最大接收间隔，比高频 `ping` 更适合形成可复核的收敛数据。

## 测试原理

- PC1 作为发送端，按固定 `pps` 发送 UDP 报文。
- 每个报文携带序号、发送端单调时钟时间戳和 realtime 时间戳。
- PC2 作为接收端，按序号统计丢包、最大连续丢包和最大接收间隔。
- 收敛估算口径：`业务中断 by loss = 最大连续丢包数 × 报文周期`。
- 报文周期计算：`报文周期 = 1000 / pps ms`。

对外发布测试结果时，建议同时给出协议、拓扑、动作、方向、`pps`、包长、最大连续丢包、最大接收间隔和原始日志路径。

## 部署工具

PC1 已安装时可直接使用：

```bash
/usr/local/bin/ring_conv
```

将工具部署到 PC2：

```bash
scp /home/net/sylix_pro/page16/ring-suit/tools/convergence/ring_conv net@192.168.200.102:/tmp/ring_conv
ssh net@192.168.200.102 'echo acoinfo | sudo -S install -m 0755 /tmp/ring_conv /usr/local/bin/ring_conv'
```

如果 PC2 无 SSH，可通过 U 盘等方式拷贝后安装：

```bash
echo acoinfo | sudo -S install -m 0755 ./ring_conv /usr/local/bin/ring_conv
```

## 典型测试命令

PC2 接收端：

```bash
mkdir -p /tmp/ring_conv_erps
/usr/local/bin/ring_conv \
  --recv \
  --bind 192.168.200.102 \
  --port 41000 \
  --pps 10000 \
  --csv /tmp/ring_conv_erps/erps_rx.csv \
  > /tmp/ring_conv_erps/erps_rx.log 2>&1
```

PC1 发送端：

```bash
mkdir -p /tmp/ring_conv_erps
/usr/local/bin/ring_conv \
  --send \
  --dest 192.168.200.102 \
  --bind 192.168.200.101 \
  --port 41000 \
  --pps 10000 \
  --size 200 \
  --duration 60 \
  --csv /tmp/ring_conv_erps/erps_tx.csv \
  > /tmp/ring_conv_erps/erps_tx.log 2>&1
```

## 测试动作建议

| 动作 | 目的 | 记录内容 |
|------|------|----------|
| 断开环上一侧链路 | 验证故障倒换 | 断链时间、恢复时间、最大连续丢包、最大接收间隔 |
| 恢复链路 | 验证恢复或回切 | 是否回切、WTR 是否生效、业务是否二次抖动 |
| ERPS `ms <port>` | 验证人工切换 | 切换端口、状态变化、业务中断窗口 |
| ERPS `fs <port>` | 验证强制切换 | 强制切换优先级、恢复方式、业务中断窗口 |
| RSTP `tc` | 验证拓扑变化传播 | FDB 刷新效果、业务影响 |

## 结果解读

假设 `pps=10000`，报文周期为 `0.1 ms`。如果最大连续丢包为 `80`，则按丢包估算的业务中断窗口为：

```text
80 × 0.1 ms = 8 ms
```

同时应关注接收端 `max_inter_arrival`，它反映接收端实际观测到的最大报文间隔。最终对外结果建议取多轮测试中的最差值。

## 排障建议

- 如果完全收不到包，先确认 PC1 / PC2 IP、端口、路由和防火墙。
- 如果丢包一直存在，确认业务 VLAN、bridge 成员端口和链路速率。
- 如果倒换后不恢复，查看协议状态：`rstp-ctl status` 或 `erps-ctl status`。
- 如果恢复后再次抖动，检查 ERPS `revertive` / `wtr_time_ms` 或 RSTP 定时器配置。
