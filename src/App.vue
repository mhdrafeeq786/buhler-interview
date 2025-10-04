<template>
  <div class="layout">
    <header class="header">
      <div class="logo" @click="$router.push('/products')">
        <img src="@/assets/buhler-logo.svg" alt="Buhler Logo" />
      </div>
      <div class="datetime">
        {{ dateTime }}
      </div>
      <div class="cart" @click="$router.push('/checkout')">
        <img src="@/assets/shopping-cart-icon.svg" alt="Cart Icon" />
        Cart ({{ totalItems }})
      </div>
    </header>

    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)

const dateTime = ref('')
let timer: number

onMounted(() => {
  updateDateTime()
  timer = window.setInterval(updateDateTime, 1000)
})

function updateDateTime() {
  const now = new Date()
  dateTime.value = now.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 36px;
  border-bottom: 1px solid var(--buhler-blue);
  color: var(--buhler-blue);
  background: var(--buhler-bg);
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding-top: 45px;
}

.logo img {
  cursor: pointer;
  height: 27px;
}

.cart {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cart img {
  height: 28px;
}
</style>
