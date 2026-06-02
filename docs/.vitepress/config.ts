import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '南京翼辉网络部产品中心',
  description: '南京翼辉信息网络技术部产品展示',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:title', content: '南京翼辉网络部产品中心' }],
    ['meta', { property: 'og:description', content: '南京翼辉信息网络技术部产品展示' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '翼辉网络产品',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '产品',
        items: [
          { text: '网卡驱动库', link: '/products/nic-driver/' },
          { text: '网络工具', link: '/products/tools/' },
          { text: '网络协议', link: '/products/protocols/' },
          { text: '开发工具', link: '/products/dev-tools/' },
        ],
      },
      { text: '更新日志', link: '/changelog' },
    ],

    sidebar: {
      '/products/nic-driver/': [
        {
          text: '网卡驱动库',
          items: [
            { text: '产品概述', link: '/products/nic-driver/' },
            { text: '快速开始', link: '/products/nic-driver/getting-started' },
          ],
        },
        {
          text: 'DesignWare GMAC',
          collapsed: true,
          items: [
            { text: '驱动概述', link: '/products/nic-driver/dw/' },
            { text: '快速开始', link: '/products/nic-driver/dw/getting-started' },
            { text: '支持架构与平台', link: '/products/nic-driver/dw/platform-support' },
            { text: 'MII 总线二次开发', link: '/products/nic-driver/dw/mii-bus-development' },
            { text: '共用 MDIO 配置', link: '/products/nic-driver/dw/shared-mdio' },
            { text: '常见问题分析', link: '/products/nic-driver/dw/faq' },
            { text: '更新日志', link: '/products/nic-driver/dw/changelog' },
            {
              text: '平台支持',
              collapsed: true,
              items: [
                { text: 'RK3568', link: '/products/nic-driver/dw/platforms/rk3568' },
                { text: 'RK3588', link: '/products/nic-driver/dw/platforms/rk3588' },
                { text: '芯驰 D9', link: '/products/nic-driver/dw/platforms/d9' },
                { text: 'LS2K1000', link: '/products/nic-driver/dw/platforms/ls2k1000' },
              ],
            },
          ],
        },
        {
          text: '沐创系列',
          collapsed: true,
          items: [
            { text: 'N400（千兆）', link: '/products/nic-driver/mucse/rnp' },
            { text: 'N500（千兆）', link: '/products/nic-driver/mucse/rnp500' },
          ],
        },
        {
          text: '飞腾系列',
          collapsed: true,
          items: [
            { text: 'PHYTIUM（FTD3000）', link: '/products/nic-driver/phytium' },
          ],
        },
        {
          text: '网讯系列',
          collapsed: true,
          items: [
            { text: 'ngbe（WX1860 千兆）', link: '/products/nic-driver/wangxun/ngbe' },
            { text: 'txgbe（WX1820 万兆）', link: '/products/nic-driver/wangxun/txgbe' },
          ],
        },
        {
          text: 'Intel 系列',
          collapsed: true,
          items: [
            { text: 'igb（i210 / i350）', link: '/products/nic-driver/intel/igb' },
            { text: 'igc（I225 / I226）', link: '/products/nic-driver/intel/igc' },
            { text: 'i40e（X710 / XL710）', link: '/products/nic-driver/intel/i40e' },
          ],
        },
        {
          text: '裕太微系列',
          collapsed: true,
          items: [
            { text: 'YT6801（千兆）', link: '/products/nic-driver/yt6801' },
          ],
        },
        {
          text: '开发文档',
          items: [
            {
              text: '性能优化',
              collapsed: true,
              items: [
                { text: '吞吐量优化', link: '/products/nic-driver/optimization/throughput' },
                { text: '通信时延优化', link: '/products/nic-driver/optimization/latency' },
              ],
            },
            { text: '问题反馈', link: '/products/nic-driver/feedback' },
            { text: '问题追踪', link: '/products/nic-driver/issue-tracker' },
          ],
        },
      ],
      '/products/tools/': [
        {
          text: '网络工具',
          items: [
            { text: '工具列表', link: '/products/tools/' },
          ],
        },
        {
          text: '工具列表',
          collapsed: false,
          items: [
            {
              text: 'ifethtool（网卡配置）',
              collapsed: true,
              items: [
                { text: '概述', link: '/products/tools/ifethtool/' },
                { text: '命令参考', link: '/products/tools/ifethtool/command-reference' },
                { text: '应用指南', link: '/products/tools/ifethtool/application-guide' },
                { text: '驱动接入', link: '/products/tools/ifethtool/driver-integration' },
              ],
            },
            { text: 'vndbind（虚拟网卡绑定）', link: '/products/tools/vndbind' },
            { text: 'xgro（软件 GRO）', link: '/products/tools/xgro' },
            { text: 'netfirewall（网络防火墙）', link: '/products/tools/netfirewall' },
            { text: 'linuxptp（时间同步）', link: '/products/tools/linuxptp' },
            { text: 'pppd（PPP 服务器）', link: '/products/tools/pppd' },
          ],
        },
      ],
      '/products/protocols/': [
        {
          text: '网络协议',
          items: [
            { text: '模块概述', link: '/products/protocols/' },
            {
              text: 'IgH EtherCAT',
              collapsed: false,
              items: [
                { text: '协议栈概述', link: '/products/protocols/igh/' },
                { text: '快速开始', link: '/products/protocols/igh/quick-start' },
                { text: '应用开发指南', link: '/products/protocols/igh/application-guide' },
              ],
            },
            {
              text: 'MQTT',
              collapsed: false,
              items: [
                { text: '协议说明', link: '/products/protocols/mqtt/' },
                { text: 'Paho 使用指导', link: '/products/protocols/mqtt/paho-usage' },
              ],
            },
          ],
        },
      ],
      '/products/dev-tools/': [
        {
          text: '开发工具',
          items: [
            { text: '工具列表', link: '/products/dev-tools/' },
          ],
        },
        {
          text: 'sydev（开发命令行）',
          collapsed: false,
          items: [
            { text: '概述', link: '/products/dev-tools/sydev/' },
            { text: '快速开始', link: '/products/dev-tools/sydev/getting-started' },
            { text: '命令参考', link: '/products/dev-tools/sydev/command-reference' },
            { text: '配置文件', link: '/products/dev-tools/sydev/configuration' },
            { text: '上传部署', link: '/products/dev-tools/sydev/upload-guide' },
            { text: 'CI/CD 集成', link: '/products/dev-tools/sydev/ci-cd' },
          ],
        },
      ],
    },

    socialLinks: [],

    footer: {
      message: '翼辉信息 · 网络技术部 | <a href="/products/">产品中心</a> · <a href="/changelog">更新日志</a> · <a href="/products/nic-driver/feedback">问题反馈</a>',
      copyright: `Copyright © ${new Date().getFullYear()} 南京翼辉信息技术有限公司`,
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: '本页目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新',
    },
  },
})

