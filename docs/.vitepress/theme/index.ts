import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProductCard from './components/ProductCard.vue'
import ProductGrid from './components/ProductGrid.vue'
import ProductHero from './components/ProductHero.vue'
import ChangelogEntry from './components/ChangelogEntry.vue'
import ProductPageHero from './components/ProductPageHero.vue'
import PlatformCard from './components/PlatformCard.vue'
import BoardTabs from './components/BoardTabs.vue'
import VersionBadge from './components/VersionBadge.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProductCard', ProductCard)
    app.component('ProductGrid', ProductGrid)
    app.component('ProductHero', ProductHero)
    app.component('ChangelogEntry', ChangelogEntry)
    app.component('ProductPageHero', ProductPageHero)
    app.component('PlatformCard', PlatformCard)
    app.component('BoardTabs', BoardTabs)
    app.component('VersionBadge', VersionBadge)
  },
}
