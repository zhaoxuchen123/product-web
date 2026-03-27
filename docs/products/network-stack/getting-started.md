# 快速开始

## 安装

```bash
pkgsrc install network-stack
```

## 初始化协议栈

```c
#include <netstack.h>

void net_init(void)
{
    /* 初始化协议栈 */
    netstack_init();

    /* 绑定网卡 */
    netif_t *netif = netif_add("eth0", &g_nic_ops);

    /* 配置 IP（静态） */
    ip4_addr_t ip   = IP4_ADDR(192, 168, 1, 100);
    ip4_addr_t mask = IP4_ADDR(255, 255, 255, 0);
    ip4_addr_t gw   = IP4_ADDR(192, 168, 1, 1);
    netif_set_addr(netif, &ip, &mask, &gw);
    netif_set_up(netif);
}
```

## DHCP 获取地址

```c
#include <dhcp.h>

/* 启动 DHCP 客户端 */
dhcp_start(netif);
```

## 创建 TCP 连接

```c
#include <socket.h>

void tcp_demo(void)
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port   = htons(80),
        .sin_addr.s_addr = inet_addr("192.168.1.1"),
    };

    connect(sock, (struct sockaddr *)&addr, sizeof(addr));

    const char *msg = "GET / HTTP/1.0\r\n\r\n";
    send(sock, msg, strlen(msg), 0);

    char buf[512];
    int n = recv(sock, buf, sizeof(buf) - 1, 0);
    buf[n] = '\0';

    close(sock);
}
```

## 下一步

- 查看完整 [API 参考](#)（待补充）
- 阅读 [更新日志](./changelog)
