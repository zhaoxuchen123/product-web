<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / netfirewall</div>
    <h1 class="plat-title">netfirewall</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 网络防火墙框架</p>
    <VersionBadge product="tools/netfirewall" />
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">Firewall</span><span class="ps-label">框架类型</span></div>
    <div class="plat-stat"><span class="ps-val">netfw_md</span><span class="ps-label">配套应用</span></div>
    <div class="plat-stat"><span class="ps-val">Driver</span><span class="ps-label">驱动控制</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

该项目提供基于 SylixOS 的网络防火墙框架，基于这个框架提供的相关操作，可以进行针对性的网络流量监控、过滤和管理等操作。


## 使用方法

该项目仅是一个嵌入框架，需搭配对应的应用软件使用，如：

- netfw_md：提供嵌入式流控、风暴防御等功能；

该项目使用时直接加载模块即可。

## 高级用法

### 驱动控制

该项目还提供更深层次的网卡驱动控制，如：

- 网卡接收中断速率控制。

要支持该属性，需要对驱动进行定制，支持方法如下：

1. 在网卡驱动中，引入该项目的 netfw_common.h 和 netfw_drv_common.h 头文件；

2. 在网卡驱动的 iotcl 实现函数中，加入防火墙的底层驱动处理即可，伪代码如下：


```C
static int mac_ioctl(struct netdev *dev, int cmd, void *arg)
{
    int                   ret  = 0;
    struct ifreq         *rq   = (struct ifreq *)arg;
	struct netfw_drv_ctl *netfw_drv_ctrl = NULL;

    ...

    switch(cmd) {
        ...

		case NETFW_DRV_CMD_CTRL:
			netfw_drv_ctrl = (struct netfw_drv_ctl *)rq->ifr_data;

            ...

			switch (*(int *)(netfw_drv_ctrl->in)) {
				case NETFW_RX_IRQ_CTRL_SLOW:
					/* set driver rx irq level to slow */
                    ...
                    break;
                case NETFW_RX_IRQ_CTRL_MEDIUM:
                    /* set driver rx irq level to medium */
                    ...
                    break;
                case NETFW_RX_IRQ_CTRL_FAST:
                    /* set driver rx irq level to fast */
                    ...
                    break;
                case NETFW_RX_IRQ_CTRL_DEFAULT:
                    /* set driver rx irq level to default */
                    ...
                    break;
                default:
                    ret = -EINVAL;
                    break;
            }
            break;
        default:
            break;
    }

    ...
    return ret;
}
```

## 最新更新

<ChangelogEntry version="1.0.0" date="2025-10-28" type="minor">

- 初始版本发布
- 新增 README 文档
- 新增 `CLASSIFY_NONE_LEVEL` 支持

</ChangelogEntry>


<style>
.plat-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 1.5rem; padding: 1.5rem; border-radius: 14px;
  border: 1px solid var(--card-border); background: var(--card-bg); margin: 1rem 0 2rem;
}
.plat-breadcrumb { font-size: 0.78rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.plat-breadcrumb a { color: var(--vp-c-brand-1); text-decoration: none; }
.plat-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 0.25rem; }
.plat-mfr { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0 0 0.75rem; }
.plat-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.plat-badge.stable { background: rgba(34,197,94,.12); color: #22c55e; }
.armory-link { display: inline-block; margin-left: 0.5rem; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; background: rgba(59,130,246,.12); color: var(--vp-c-brand-1); text-decoration: none !important; }
.armory-link:hover { opacity: 0.8; }
.plat-hero-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }
.plat-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.6rem 1rem; border-radius: 10px;
  background: rgba(59,130,246,.06); border: 1px solid rgba(59,130,246,.1);
}
.ps-val   { font-size: 1rem; font-weight: 800; color: var(--vp-c-brand-1); }
.ps-label { font-size: 0.65rem; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
