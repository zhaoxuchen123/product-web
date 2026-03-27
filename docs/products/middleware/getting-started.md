# 快速开始

## 安装

```bash
pkgsrc install net-middleware
```

## MQTT 客户端示例

```c
#include <mqtt_client.h>

static void on_message(const char *topic, const uint8_t *payload, int len)
{
    /* 处理接收到的消息 */
}

void mqtt_demo(void)
{
    mqtt_cfg_t cfg = {
        .host      = "broker.example.com",
        .port      = 1883,
        .client_id = "my-device-001",
        .keepalive = 60,
        .on_msg    = on_message,
    };

    mqtt_client_t *client = mqtt_client_init(&cfg);
    mqtt_client_connect(client);

    mqtt_subscribe(client, "sensor/data", QOS_1);
    mqtt_publish(client, "device/status", "online", 6, QOS_0);
}
```

## HTTP Server 示例

```c
#include <http_server.h>

static void handle_root(http_req_t *req, http_resp_t *resp)
{
    http_resp_set_status(resp, 200);
    http_resp_set_body(resp, "Hello, World!", 13);
}

void httpd_demo(void)
{
    http_server_t *srv = http_server_create(8080);
    http_server_route(srv, "GET", "/", handle_root);
    http_server_start(srv);
}
```

## Modbus TCP 示例

```c
#include <modbus_tcp.h>

void modbus_demo(void)
{
    modbus_tcp_t *mb = modbus_tcp_init("192.168.1.10", 502);
    modbus_tcp_connect(mb);

    uint16_t regs[4];
    modbus_read_holding_regs(mb, 1, 0x0000, 4, regs);

    modbus_tcp_close(mb);
}
```

## 下一步

- 查看完整 [API 参考](#)（待补充）
- 阅读 [更新日志](./changelog)
