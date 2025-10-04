<template>
  <main class="dashboard">
    <section
      v-for="(products, category) in groupedProducts"
      :key="category"
      class="category-section"
    >
      <h5 class="section-title">{{ categoryTitles[category] || category }}</h5>
      <div class="products-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div class="image-container">
            <img class="product-image" :src="product.imageUrl" :alt="product.name" />
          </div>
          <div class="price-info">
            <span>{{ product.name }}</span>
            <div class="price-cart">
              <p>x{{ product.price.toFixed(2) }}</p>
              <button class="cart-btn" @click.stop="addToCart(product)">
                <img src="@/assets/shopping-cart-icon.svg" alt="Cart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import productsData from '@/constants/http/products.json'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const groupedProducts = ref<Record<string, any[]>>({})
const categoryTitles: Record<string, string> = {
  machine_roller: 'Rollers',
  machine_sorter: 'Optical Sorters',
  machine_dryer: 'Dryers',
  machine_die_casting: 'Die Casting Machines',
}

onMounted(() => {
  const groups: Record<string, any[]> = {}
  productsData.forEach((product) => {
    if (!groups[product.category]) {
      groups[product.category] = []
    }
    groups[product.category].push(product)
  })
  groupedProducts.value = groups
})

const addToCart = (product: any) => {
  console.log('Adding to cart:', product)
  cartStore.addToCart(product)
}
</script>

<style scoped>
.dashboard {
  padding: 0 40px;
}

.section-title {
  color: var(--buhler-blue);
  margin: 20px 0 10px;
}

.category-section {
  margin-bottom: 40px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(172px, 1fr));
  gap: 12px;
}

.product-card {
  background: var(--buhler-light-grey);
  color: var(--buhler-blue);
  border: 2px solid var(--buhler-light-grey);
  border-radius: 1px;
}

.product-card:hover {
  border: 2px solid var(--buhler-blue);
  cursor: pointer;
}

.product-card .product-image {
  background-color: var(--buhler-white);
  width: 100%;
  height: 175px;
  object-fit: contain;
}

.product-card .image-container {
  padding: 10px;
  background: var(--buhler-cream);
}

.product-card .price-info {
  padding: 4px 12px;
}
.product-card .price-info span {
  font-size: 14px;
  font-weight: 500;
}
.product-card .price-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.product-card .price-cart p {
  margin: 0;
  font-weight: 600;
}
.product-card .cart-btn {
  border: 1px solid var(--buhler-light-grey);
  width: 40px;
}

.product-card .cart-btn img {
  height: 28px;
}
</style>
