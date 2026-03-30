<template>
  <div class="product-hero">
    <div class="product-hero__bg" />
    <div class="product-hero__content">
      <div class="product-hero__badge">{{ badge }}</div>
      <h1 class="product-hero__title">{{ title }}</h1>
      <p class="product-hero__subtitle">{{ subtitle }}</p>
      <div class="product-hero__actions">
        <a v-if="primaryLink" :href="withBase(primaryLink)" class="product-hero__btn product-hero__btn--primary">{{ primaryText }}</a>
        <a v-if="secondaryLink" :href="withBase(secondaryLink)" class="product-hero__btn product-hero__btn--secondary">{{ secondaryText }}</a>
      </div>
      <div class="product-hero__stats">
        <slot name="stats" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{
  title: string
  subtitle: string
  badge?: string
  primaryLink?: string
  primaryText?: string
  secondaryLink?: string
  secondaryText?: string
}>()
</script>

<style scoped>
.product-hero {
  position: relative;
  padding: 4rem 2rem;
  border-radius: 16px;
  overflow: hidden;
  margin: 2rem 0;
  text-align: center;
}

.product-hero__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0d3d7a 0%, #1a6fd4 50%, #38b2f4 100%);
  opacity: 0.92;
}

.product-hero__content {
  position: relative;
  z-index: 1;
  color: #fff;
}

.product-hero__badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  background: rgba(255,255,255,0.2);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  backdrop-filter: blur(4px);
}

.product-hero__title {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.product-hero__subtitle {
  font-size: 1.05rem;
  opacity: 0.85;
  max-width: 560px;
  margin: 0 auto 1.75rem;
  line-height: 1.7;
}

.product-hero__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.product-hero__btn {
  padding: 0.55rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
}

.product-hero__btn--primary {
  background: #fff;
  color: #1a6fd4;
}

.product-hero__btn--primary:hover {
  background: #e8f0fe;
}

.product-hero__btn--secondary {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(4px);
}

.product-hero__btn--secondary:hover {
  background: rgba(255,255,255,0.25);
}

.product-hero__stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
</style>
