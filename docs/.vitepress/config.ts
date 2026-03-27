import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '南京翼辉网络部产品中心',
  description: '南京翼辉信息网络技术部产品展示',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '南京翼辉网络部产品中心',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '产品',
        items: [
          { text: '网卡驱动库', link: '/products/nic-driver/' },
          { text: '网络协议栈', link: '/products/network-stack/' },
          { text: '网络中间件工具', link: '/products/middleware/' },
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
          collapsed: false,
          items: [
            { text: '驱动概述', link: '/products/nic-driver/dw/' },
            { text: '快速开始', link: '/products/nic-driver/dw/getting-started' },
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
          text: 'Intel 系列',
          collapsed: false,
          items: [
            { text: 'igb（i210 / i350）', link: '/products/nic-driver/intel/igb' },
            { text: 'igc（I225 / I226）', link: '/products/nic-driver/intel/igc' },
            { text: 'i40e（X710 / XL710）', link: '/products/nic-driver/intel/i40e' },
          ],
        },
        {
          text: '开发文档',
          items: [
            { text: '二次开发指南', link: '/products/nic-driver/dev-guide' },
            { text: '问题反馈', link: '/products/nic-driver/feedback' },
          ],
        },
      ],
      '/products/network-stack/': [
        {
          text: '网络协议栈',
          items: [
            { text: '概述', link: '/products/network-stack/' },
            { text: '快速开始', link: '/products/network-stack/getting-started' },
            { text: '更新日志', link: '/products/network-stack/changelog' },
          ],
        },
      ],
      '/products/middleware/': [
        {
          text: '网络中间件工具',
          items: [
            { text: '概述', link: '/products/middleware/' },
            { text: '快速开始', link: '/products/middleware/getting-started' },
            { text: '更新日志', link: '/products/middleware/changelog' },
          ],
        },
      ],
    },

    socialLinks: [],

    footer: {
      message: '嵌入式操作系统网络部门',
      copyright: `Copyright © ${new Date().getFullYear()}`,
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
