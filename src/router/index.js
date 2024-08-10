// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import WishList from '../views/WishList.vue';
import Login from '../views/LoginPage.vue';
import Cart from '../views/CartPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/wishList',
    name: 'WishList',
    component: WishList,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to ensure users are redirected to the login page if not authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
