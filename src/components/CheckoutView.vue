<template>
  <main class="checkout">
    <h5>Checkout</h5>
    <div v-if="cart.items.length === 0" class="empty">Your cart is empty.</div>
    <div v-else class="cart-list">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.imageUrl" alt="" class="thumb" />
        <div class="info">
          <div class="item-header">
            <h6>{{ item.name }}</h6>
            <div>x{{ (item.price * item.quantity).toFixed(2) }}</div>
            <div class="quantity-controls">
              <button v-if="item.quantity > 1" @click="cart.decreaseQuantity(item.id)">-</button>
              <button v-else @click="cart.removeFromCart(item.id)">
                <img class="delete-btn" src="@/assets/trash-icon.svg" alt="Trash Icon" />
              </button>

              <input type="text" :value="item.quantity" readonly />
              <button @click="cart.increaseQuantity(item.id)">+</button>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-danger" @click="cart.removeFromCart(item.id)">
          Remove
        </button>
      </div>
      <div class="cart-summary">Total Amount: {{ totalCost.toFixed(2) }}</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'
const cart = useCartStore()
const totalCost = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
</script>

<style scoped>
.checkout {
  padding: 20px 40px;
  color: var(--buhler-blue);
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--buhler-light-grey);
  padding: 8px;
  border-radius: 4px;
}

.thumb {
  background: var(--buhler-white);
  width: 80px;
  height: 60px;
  object-fit: contain;
}

.info {
  flex: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-header h6 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--buhler-light-grey);
  background: var(--buhler-white);
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls input {
  width: 36px;
  height: 30px;
  text-align: center;
  border: 1px solid var(--buhler-light-grey);
  color: var(--buhler-blue);
  border-radius: 6px;
}

.delete-btn {
  width: 16px;
  height: 16px;
}

.cart-summary {
  margin-top: 16px;
  padding: 12px;
  border-top: 2px solid var(--buhler-blue);
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: 600;
}
</style>
