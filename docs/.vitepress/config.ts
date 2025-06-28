import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

const description = "Freqtrade函数、技术指标及高收益量化策略详解 全面介绍Freqtrade量化交易框架中的常用函数及使用规则，涵盖常见技术指标如 RSI、MACD、EMA、SMA、ADX、布林带、MFI、OBV、CCI、ATR、Stochastic、VWAP、Ichimoku 等的计算方法与实战用法，分享在回测中收益率较高的多因子选股与趋势策略，适用于构建自动化交易机器人。 关键词：Freqtrade函数, 量化指标, 技术分析, 高收益策略, RSI, MACD, EMA, ADX, Bollinger Bands, ATR, OBV, CCI, Stochastic, VWAP, Ichimoku, 超买超卖, 趋势策略, 资金流向, 回测优化, 自动交易系统";

const teekConfig = defineTeekConfig({
  blogger: {
    avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
    shape: "circle-rotate",
    name: "iTrades",
    slogan: "专注于量化交易与策略研究，探索自动化交易的无限可能。",
    circleBgImg: "/blog/bg4.webp",
    color: "#ffffff",
  },
  footerInfo: {
    theme: {
      show: false,
    },
    copyright: {
      show: true,
      createYear: 2023,
    },
  },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  post: {
    showCapture: true,
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },

  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "",
      },
    },
    {
      provider: "google",
      options: {
        id: "",
      },
    },
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "iTrades",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/freqtrade-logo-mimi.png" }],
    ["link", { rel: "icon", type: "image/png", href: "/freqtrade-logo-mimi.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Teek | VitePress Theme" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { property: "og:description", description }],
    ["meta", { name: "description", description }],
    ["meta", { name: "author", content: "Teek" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],

    ["meta", { name: "keywords", description }],
    ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
    ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
    ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "//sdk.51.la/js-sdk-pro.min.js" }], // 51.la
    [
      "script",
      {},
      `typeof LA !== 'undefined' && LA.init({ id: "3LqfP8Icg0GeEvtn", ck: "3LqfP8Icg0GeEvtn", hashMode: true })`,
    ], // 51.la
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://vp.teek.top",
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/freqtrade-logo-mimi.png",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      // { text: "首页", link: "/" },
      { text: "主题配置", link: "/freqtrade/11", activeMatch: "/01.freqtrade/", },
      { text: "指标库", link: "/indicator/11", activeMatch: "/indicator/" },

    ],

    search: {
      provider: "local",
    },

  },
});
