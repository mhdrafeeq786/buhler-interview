import { createRouter, createWebHistory } from 'vue-router'
import ProductDashboard from '../views/ProductDashboard.vue'
import ProductView from '../views/ProductView.vue'
import CheckoutView from '../components/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'products',
      component: ProductDashboard,
    },
    { path: '/checkout', name: 'checkout', component: CheckoutView },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductView,
    },
  ],
})

export default router
