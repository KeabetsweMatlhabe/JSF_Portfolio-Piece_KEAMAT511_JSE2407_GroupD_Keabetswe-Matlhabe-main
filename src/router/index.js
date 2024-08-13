// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CartPage from '../views/CartPage.vue';
import LoginPage from '../views/LoginPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import WishList from '../views/WishList.vue';

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/cart', component: CartPage, meta: { requiresAuth: true } },
  { path: '/products/:id', component: ProductDetailPage, meta: { requiresAuth: true } },
  { path: '/wishList', component: WishList, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
