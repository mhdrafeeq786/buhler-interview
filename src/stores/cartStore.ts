import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: any) {
      console.log('Pinia store received:', product)
      const existingItem = this.items.find((p) => p.id === product.id)
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      console.log('Current cart items:', this.items)
    },

    increaseQuantity(id: string) {
      const item = this.items.find((p) => p.id === id)
      if (item) item.quantity++
    },

    decreaseQuantity(id: string) {
      const item = this.items.find((p) => p.id === id)
      if (item && item.quantity > 1) {
        item.quantity--
      } else {
        this.removeFromCart(id)
      }
    },

    removeFromCart(id: string) {
      this.items = this.items.filter((p) => p.id !== id)
    },
  },
})
