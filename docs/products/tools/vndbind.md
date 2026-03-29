<script setup>
import ChangelogEntry from '../../.vitepress/theme/components/ChangelogEntry.vue'
</script>

<div class="plat-hero">
  <div class="plat-hero-left">
    <div class="plat-breadcrumb"><a href="/products/tools/">网络工具</a> / vndbind</div>
    <h1 class="plat-title">vndbind</h1>
    <p class="plat-mfr">南京翼辉网络部 · SylixOS 虚拟网卡绑定工具</p>
    <span class="plat-badge stable">v1.0.0</span>
    <a class="armory-link" href="http://10.7.1.31/acohub/armory/" target="_blank">Armory 获取</a>
  </div>
  <div class="plat-hero-stats">
    <div class="plat-stat"><span class="ps-val">VND</span><span class="ps-label">虚拟网卡</span></div>
    <div class="plat-stat"><span class="ps-val">CLI</span><span class="ps-label">工具类型</span></div>
    <div class="plat-stat"><span class="ps-val">多对一</span><span class="ps-label">绑定模式</span></div>
    <div class="plat-stat"><span class="ps-val">SylixOS</span><span class="ps-label">目标平台</span></div>
  </div>
</div>

## 简介

`vndbind` 用于创建一个「附生」在物理网卡上的 SylixOS VND（虚拟网卡），借助物理网卡链路完成网络通信。多个虚拟网卡可同时绑定同一物理网卡。

## MAC 地址过滤

虚拟网卡的 MAC 地址与物理网卡不同，工具提供两种过滤机制：

- **默认**：尝试配置物理网卡的 MAC 地址过滤，失败时自动回退为混杂模式
- **强制混杂**：设置环境变量 `VNDBIND_ALWAYS_PROMISC=1`，直接使用混杂模式

> 默认的 MAC 地址过滤需要物理网卡驱动支持 rxmode。

## 使用方法

### 创建并绑定

```bash
vndbind add <vnd id> <netdev ifname>

# 示例：创建 id=0 的虚拟网卡，绑定物理网卡 en1
vndbind add 0 en1

# 强制混杂模式
VNDBIND_ALWAYS_PROMISC=1 vndbind add 0 en1
```

### 删除绑定

```bash
vndbind del <vnd ifname>

# 示例：删除 vn3
vndbind del vn3
```

### 修改绑定的物理网卡

```bash
vndbind chg <vnd ifname> <new netdev ifname>

# 示例：将 vn3 从 en2 改绑到 en1
vndbind chg vn3 en1
```

### 查看所有绑定

```bash
vndbind list
```

输出示例：

```
==============================================
VNDBIND INFO
==============================================
[en1] bind vnd list:
    vn3: 28:fb:dd:ed:07:a0
[en2] bind vnd list:
    vn4: 28:ff:f8:5d:b6:b2
    vn5: 28:ff:f8:5d:b6:b2
```

## 开发 API

```c
/* 创建绑定对 */
int vndbind_create_pair(int id, struct netdev *netdev);

/* 删除绑定对 */
int vndbind_delete_pair(struct netdev *vnd_netdev);

/* 修改绑定的物理网卡 */
int vndbind_change_pair(struct netdev *vnd_netdev, struct netdev *new_netdev);

/* 列出所有绑定对 */
int vndbind_list_pairs(void);
```

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
