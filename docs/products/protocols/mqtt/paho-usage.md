# Paho MQTT 使用指导

SylixOS `libpaho_mqtt` 工程移植自 Eclipse Paho MQTT C Client，支持 MQTT 3.1.1 和 MQTT 5.0 协议。应用程序可根据是否需要 TLS、同步或异步接口，选择对应的动态库进行链接。

## 动态库选择

`libpaho_mqtt` 编译后会生成以下动态库：

| 动态库 | 接口类型 | TLS | 适用场景 |
|--------|----------|-----|----------|
| `libpaho-mqtt3c.so` | 同步接口 | 否 | 普通 MQTT 客户端，调用流程简单 |
| `libpaho-mqtt3cs.so` | 同步接口 | 是 | 需要 TLS 加密的同步客户端 |
| `libpaho-mqtt3a.so` | 异步接口 | 否 | 事件驱动或不希望阻塞主线程的客户端 |
| `libpaho-mqtt3as.so` | 异步接口 | 是 | 需要 TLS 加密的异步客户端 |

选择建议：

- 业务流程简单、消息量较小：优先使用同步接口。
- 需要回调驱动、并发处理或避免阻塞：使用异步接口。
- 需要安全传输：选择带 `s` 后缀的 TLS 版本。

## 同步接口发布流程

同步接口使用 `MQTTClient.h`，典型流程为创建客户端、配置连接参数、连接 Broker、发布消息、处理网络流量。

```c
#include "MQTTClient.h"

#define ADDRESS  "tcp://broker:1883"
#define CLIENTID "sylixos_pub"
#define TOPIC    "demo/topic"
#define PAYLOAD  "Hello"

int mqtt_sync_publish(void)
{
    MQTTClient client;
    MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
    MQTTClient_message pubmsg = MQTTClient_message_initializer;
    MQTTClient_deliveryToken token;
    int ret;

    ret = MQTTClient_create(&client, ADDRESS, CLIENTID,
                            MQTTCLIENT_PERSISTENCE_NONE, NULL);
    if (ret != MQTTCLIENT_SUCCESS) {
        return ret;
    }

    conn_opts.keepAliveInterval = 20;
    conn_opts.cleansession = 1;

    ret = MQTTClient_connect(client, &conn_opts);
    if (ret != MQTTCLIENT_SUCCESS) {
        MQTTClient_destroy(&client);
        return ret;
    }

    pubmsg.payload = PAYLOAD;
    pubmsg.payloadlen = (int)strlen(PAYLOAD);
    pubmsg.qos = 1;
    pubmsg.retained = 0;

    ret = MQTTClient_publishMessage(client, TOPIC, &pubmsg, &token);
    if (ret == MQTTCLIENT_SUCCESS) {
        MQTTClient_waitForCompletion(client, token, 10000L);
    }

    MQTTClient_disconnect(client, 10000);
    MQTTClient_destroy(&client);
    return ret;
}
```

如果同步客户端需要持续接收消息，需要在业务循环中调用接收接口处理网络流量：

```c
while (1) {
    MQTTClient_receive(client, NULL, 0, 1000);
}
```

## 异步接口发布流程

异步接口使用 `MQTTAsync.h`。应用需要先设置回调函数，再调用 `MQTTAsync_connect` 发起连接；连接成功后通常在 `onConnect` 回调中发布消息。

```c
#include "MQTTAsync.h"

#define ADDRESS  "tcp://broker:1883"
#define CLIENTID "sylixos_async_pub"
#define TOPIC    "demo/topic"
#define PAYLOAD  "Hello"
#define QOS      1

static void on_send(void *context, MQTTAsync_successData *response)
{
    /* 发送成功处理 */
}

static void on_send_failure(void *context, MQTTAsync_failureData *response)
{
    /* 发送失败处理 */
}

static void on_connect(void *context, MQTTAsync_successData *response)
{
    MQTTAsync client = (MQTTAsync)context;
    MQTTAsync_responseOptions opts = MQTTAsync_responseOptions_initializer;
    MQTTAsync_message pubmsg = MQTTAsync_message_initializer;

    opts.onSuccess = on_send;
    opts.onFailure = on_send_failure;
    opts.context = client;

    pubmsg.payload = PAYLOAD;
    pubmsg.payloadlen = (int)strlen(PAYLOAD);
    pubmsg.qos = QOS;
    pubmsg.retained = 0;

    MQTTAsync_sendMessage(client, TOPIC, &pubmsg, &opts);
}

static void on_connect_failure(void *context, MQTTAsync_failureData *response)
{
    /* 连接失败处理 */
}

int mqtt_async_publish(void)
{
    MQTTAsync client;
    MQTTAsync_connectOptions conn_opts = MQTTAsync_connectOptions_initializer;
    int ret;

    ret = MQTTAsync_create(&client, ADDRESS, CLIENTID,
                           MQTTCLIENT_PERSISTENCE_NONE, NULL);
    if (ret != MQTTASYNC_SUCCESS) {
        return ret;
    }

    MQTTAsync_setCallbacks(client, client, NULL, NULL, NULL);

    conn_opts.keepAliveInterval = 20;
    conn_opts.cleansession = 1;
    conn_opts.onSuccess = on_connect;
    conn_opts.onFailure = on_connect_failure;
    conn_opts.context = client;

    return MQTTAsync_connect(client, &conn_opts);
}
```

## 订阅与消息到达

异步订阅场景通常需要实现消息到达回调：

```c
static int message_arrived(void *context, char *topic_name, int topic_len,
                           MQTTAsync_message *message)
{
    /* 处理 topic_name 和 message->payload */
    MQTTAsync_freeMessage(&message);
    MQTTAsync_free(topic_name);
    return 1;
}

static void connection_lost(void *context, char *cause)
{
    /* 连接丢失后可在此触发重连 */
}

MQTTAsync_setCallbacks(client, client, connection_lost, message_arrived, NULL);
```

## 工程集成建议

- 根据接口类型选择链接 `libpaho-mqtt3c.so` 或 `libpaho-mqtt3a.so`。
- 需要 TLS 时选择 `libpaho-mqtt3cs.so` 或 `libpaho-mqtt3as.so`，并确认系统证书、时间和加密库环境正确。
- `client_id` 应保持唯一，避免多个客户端使用相同 ID 导致相互踢下线。
- 根据业务可靠性选择 QoS：状态类数据可用 QoS 0，控制类或关键事件建议 QoS 1 或 QoS 2。
- 合理设置 `keepAliveInterval`，弱网或蜂窝网络环境不宜过短。
- 异步接口应在回调中避免长时间阻塞，复杂业务可投递到工作线程处理。

## 常见问题

**连接 Broker 失败**

- 检查 Broker 地址、端口和网络连通性。
- 检查用户名、密码、Client ID 是否满足 Broker 策略。
- TLS 连接需检查证书、系统时间和加密套件支持。

**发布成功但订阅端收不到**

- 检查 Topic 是否一致，包括大小写和层级分隔符 `/`。
- 检查订阅 QoS、发布 QoS 和 Broker ACL 配置。
- 检查订阅端是否已成功连接并完成 `SUBSCRIBE`。

**消息重复**

- QoS 1 语义允许重复到达，业务侧需要按消息 ID 或业务序号去重。
- 如果要求严格仅一次处理，可评估 QoS 2，但需要接受更高协议开销。

## 参考资料

- [Eclipse Paho MQTT C Client](https://eclipse.dev/paho/index.php?page=clients/c/index.php)
- [Paho MQTT C GitHub 仓库](https://github.com/eclipse-paho/paho.mqtt.c)
- [MQTT 官方网站](https://mqtt.org/)

