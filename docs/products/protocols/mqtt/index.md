# MQTT 协议说明

MQTT（Message Queuing Telemetry Transport）是一种轻量级的物联网通信协议，基于发布/订阅模型运行在 TCP/IP 之上。它通过 Broker 解耦消息发布者与订阅者，适合低带宽、高延迟、不稳定网络以及终端算力有限的嵌入式设备场景。

MQTT 常用于物联网数据采集、M2M 通信、消息推送、智能设备、车联网、智慧城市、远程医疗、电力能源等领域。

## 协议特点

- **发布/订阅模型**：客户端不需要知道对端地址，只需要围绕 Topic 发布或订阅消息。
- **协议开销小**：固定报头最小仅 1 字节，心跳报文开销低，适合资源受限设备。
- **支持 QoS**：提供 0、1、2 三种服务质量等级，用于在性能和可靠性之间取舍。
- **会话保持**：支持 Clean Session / 持久会话，可保存订阅状态和离线消息。
- **心跳保活**：通过 Keep Alive 与 `PINGREQ` / `PINGRESP` 检测连接状态。
- **遗嘱消息**：通过 Last Will and Testament 感知客户端异常断开并通知相关订阅者。
- **负载透明**：Payload 内容由业务定义，协议本身不强制应用层数据格式。

## 发布/订阅模型

MQTT 通信中通常包含三个角色：

| 角色 | 说明 |
|------|------|
| Publisher | 发布者，向指定 Topic 发布消息 |
| Subscriber | 订阅者，订阅 Topic 并接收匹配消息 |
| Broker | 消息代理，负责连接管理、主题匹配、消息转发和会话维护 |

发布者和订阅者都是 MQTT Client，同一个客户端可以同时发布和订阅。Broker 是服务端，负责将发布者发送到某个 Topic 的消息分发给订阅该 Topic 的客户端。

```text
Publisher ── publish(topic, payload) ──► Broker ──► Subscriber
```

与传统请求/响应模式相比，发布/订阅模型降低了客户端之间的耦合：客户端不需要提前知道对端 IP、端口，也不要求发布者和订阅者同时在线。

## Topic 与 Payload

MQTT 消息主要由 Topic 和 Payload 组成：

| 字段 | 说明 |
|------|------|
| Topic | 消息主题，用于 Broker 做路由匹配，例如 `factory/line1/temp` |
| Payload | 消息负载，即应用层数据，格式可由业务自定义，例如 JSON、二进制、文本 |

Topic 通常按层级组织，使用 `/` 分隔路径。客户端订阅某个 Topic 后，即可收到其他客户端发布到该 Topic 的消息。

## QoS 等级

MQTT 支持三种消息服务质量等级：

| QoS | 语义 | 适用场景 |
|-----|------|----------|
| QoS 0 | At most once，最多一次。消息依赖底层 TCP/IP 发送，不做额外确认，可能丢失 | 高频传感器数据、允许偶发丢包的状态上报 |
| QoS 1 | At least once，至少一次。确保消息到达，但可能重复 | 需要可靠到达、业务可去重的控制或事件消息 |
| QoS 2 | Exactly once，只有一次。通过四步握手保证消息只到达一次 | 计费、交易、关键控制等对重复和丢失都敏感的场景 |

QoS 越高，协议交互越多，可靠性更强，但网络和处理开销也更大。实际工程中应根据业务容忍度选择合适等级。

## 会话与心跳

客户端发起 `CONNECT` 时，可通过 Clean Session 控制会话行为：

- `Clean Session = 1`：创建临时会话，客户端断开后会话销毁。
- `Clean Session = 0`：创建持久会话，客户端断开后 Broker 保留订阅关系和离线消息，直到会话过期或被清理。

Keep Alive 用于定义客户端与 Broker 的最大空闲时间。若在该时间内没有业务报文，客户端应发送 `PINGREQ`，Broker 回复 `PINGRESP`，用于保持连接并检测异常断开。

## 遗嘱消息

Last Will and Testament 用于处理客户端异常断开场景。客户端连接 Broker 时可提前设置遗嘱 Topic、Payload、QoS 和 Retain 标志。当 Broker 判断客户端异常离线后，会自动向遗嘱 Topic 发布该消息。

典型用途：

- 设备离线通知；
- 网关异常告警；
- 业务状态清理；
- 在线/离线状态广播。

## MQTT 报文类型

MQTT 由多种控制报文组成，常见报文如下：

| 报文 | 说明 | 是否包含 Payload |
|------|------|------------------|
| `CONNECT` | 客户端请求连接 Broker | 是 |
| `CONNACK` | Broker 确认连接结果 | 否 |
| `PUBLISH` | 发布应用消息 | 可选 |
| `PUBACK` | QoS 1 发布确认 | 否 |
| `PUBREC` / `PUBREL` / `PUBCOMP` | QoS 2 发布流程报文 | 否 |
| `SUBSCRIBE` | 订阅主题 | 是 |
| `SUBACK` | Broker 返回订阅结果 | 是 |
| `UNSUBSCRIBE` | 取消订阅 | 是 |
| `UNSUBACK` | Broker 确认取消订阅 | 否 |
| `PINGREQ` / `PINGRESP` | 心跳请求与响应 | 否 |
| `DISCONNECT` | 客户端主动断开 | 否 |

## 版本与实现

常见 MQTT 版本包括 MQTT 3.1.1 与 MQTT 5.0。翼辉 SylixOS `libpaho_mqtt` 工程移植自 Eclipse Paho MQTT C Client，可用于开发 MQTT 3.1.1 与 MQTT 5.0 客户端应用。

如果需要在 SylixOS 上开发 MQTT 应用，可继续阅读：[Paho MQTT 使用指导](./paho-usage)。

## 参考资料

- [MQTT 官方网站](https://mqtt.org/)
- [OASIS MQTT 3.1.1 标准](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)
- [OASIS MQTT 5.0 标准](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html)
- [Eclipse Paho MQTT C Client](https://eclipse.dev/paho/index.php?page=clients/c/index.php)

