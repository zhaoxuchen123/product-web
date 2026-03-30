# 问题反馈

<script setup>
import { MessageSquare, Bug, Lightbulb, BookOpen } from 'lucide-vue-next'
</script>

<div class="fb-intro">
遇到驱动问题或有改进建议？请通过以下渠道联系我们，我们承诺在 <strong>2 个工作日</strong>内响应。
</div>

## 反馈渠道

<div class="fb-channels">

<div class="fb-channel">
  <div class="fb-ch-icon"><Bug :size="20" /></div>
  <div class="fb-ch-body">
    <div class="fb-ch-title">Bug 报告</div>
    <div class="fb-ch-desc">驱动崩溃、数据错误、初始化失败等问题</div>
    <a class="fb-ch-link" href="mailto:nic-driver@acoinfo.com?subject=[BUG] 网卡驱动问题反馈">发送邮件 →</a>
  </div>
</div>

<div class="fb-channel">
  <div class="fb-ch-icon"><Lightbulb :size="20" /></div>
  <div class="fb-ch-body">
    <div class="fb-ch-title">功能需求</div>
    <div class="fb-ch-desc">新平台适配申请、新特性需求</div>
    <a class="fb-ch-link" href="mailto:nic-driver@acoinfo.com?subject=[FEAT] 需求申请">发送邮件 →</a>
  </div>
</div>

<div class="fb-channel">
  <div class="fb-ch-icon"><MessageSquare :size="20" /></div>
  <div class="fb-ch-body">
    <div class="fb-ch-title">技术咨询</div>
    <div class="fb-ch-desc">集成问题、配置疑问、性能调优咨询</div>
    <a class="fb-ch-link" href="mailto:nic-driver@acoinfo.com?subject=[QA] 技术咨询">发送邮件 →</a>
  </div>
</div>

</div>

## 提交 Bug 报告时请包含

提供以下信息可以帮助我们更快定位问题：

1. **平台信息**：SoC 型号、操作系统版本、驱动包版本（`armory list`）
2. **复现步骤**：最小化的复现代码或操作序列
3. **现象描述**：错误现象、错误码、日志输出
4. **硬件配置**：PHY 型号、时钟配置、`nic_cfg_t` 内容
5. **统计信息**（如可获取）：

```c
nic_stats_t stats;
nic_ioctl(&g_nic, NIC_IOCTL_GET_STATS, &stats);
/* 请将输出结果附在邮件中 */
```

## 新平台适配申请

如需适配新的 SoC 平台，请提供：

| 信息项 | 说明 |
|--------|------|
| 芯片型号 | 例：某某科技 XYZ-1000 |
| 网卡控制器 IP | 例：DesignWare GMAC v4.10 |
| PHY 型号 | 例：RTL8211F |
| 目标 OS | SylixOS / RTOS / 其他 |
| 预计用量 | 原型 / 小批量 / 量产 |
| 期望交付时间 | — |

请将以上信息发送至：**nic-driver@acoinfo.com**

<style>
.fb-intro {
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border-left: 3px solid var(--vp-c-brand-1);
  background: rgba(59,130,246,.06);
  font-size: 0.95rem; color: var(--vp-c-text-2);
  margin: 1.5rem 0 2rem;
}
.fb-channels { display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0 2rem; }
.fb-channel {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
.fb-ch-icon {
  width: 38px; height: 38px; flex-shrink: 0; border-radius: 9px;
  background: linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.15));
  border: 1px solid rgba(59,130,246,.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-brand-1);
}
.fb-ch-title { font-size: 0.92rem; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.fb-ch-desc  { font-size: 0.82rem; color: var(--vp-c-text-3); margin-bottom: 0.5rem; }
.fb-ch-link  { font-size: 0.82rem; color: var(--vp-c-brand-1); text-decoration: none; font-weight: 600; }
.fb-ch-link:hover { text-decoration: underline; }
</style>
