<template>
  <main class="product-detail" v-if="product">
    <button class="back-btn" @click="$router.back()">Back</button>

    <div class="product-container">
      <img :src="product.imageUrl" alt="Product Image" class="product-image" />

      <div class="product-info">
        <h5>{{ product.name }}</h5>
        <p class="category">{{ product.category }}</p>
        <p class="price">x{{ product.price.toFixed(2) }}</p>

        <button class="add-to-cart" @click="addToCart(product)">
          <img src="@/assets/shopping-cart-icon.svg" alt="Cart Icon" />
          Add to Cart
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import productsData from '@/constants/http/products.json'

const route = useRoute()
const cart = useCartStore()

let product = ref<any>(null)

onMounted(() => {
  const id = route.params.id
  product.value = productsData.find((p) => p.id === id)
  console.log('Product:', product.value)
})

const addToCart = (item: any) => {
  cart.addToCart(item)
}
</script>

<style scoped>
.product-detail {
  color: var(--buhler-blue);
  padding: 20px 40px;
}

.back-btn {
  border: none;
  background: none;
  color: var(--buhler-blue);
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 12px;
}

.product-container {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 20px 6px;
  border-radius: 8px;
}

.product-image {
  background-color: var(--buhler-white);
  width: 250px;
  height: 250px;
  border-radius: 8px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.price {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.add-to-cart {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: var(--buhler-blue);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 11vh;
}

.add-to-cart img {
  width: 32px;
  height: 32px;
}
</style>
