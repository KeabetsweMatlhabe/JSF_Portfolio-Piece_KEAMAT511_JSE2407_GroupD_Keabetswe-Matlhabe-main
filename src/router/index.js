
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CartPage from '../views/CartPage.vue';
import LoginPage from '../views/LoginPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import WishList from '../views/WishList.vue';
import ComparisonPage from '../views/ComparisonPage.vue';

const routes = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { requiresAuth: true, theme: 'light' }, 
    name: 'Home',
    props: true // This allows passing props to the component
  },
  { 
    path: '/login', 
    component: LoginPage, 
    name: 'Login' 
  },
  { 
    path: '/comparison', 
    component: ComparisonPage, 
    meta: { requiresAuth: true }, 
    name: 'Comparison',
    props: true
  },
  { 
    path: '/cart', 
    component: CartPage, 
    meta: { requiresAuth: true }, 
    name: 'Cart',
    props: true
  },
  { 
    path: '/products/:id', 
    component: ProductDetailPage, 
    meta: { requiresAuth: true }, 
    name: 'ProductDetail',
    props: true
  },
  { 
    path: '/wishList', 
    component: WishList, 
    meta: { requiresAuth: true }, 
    name: 'WishList',
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;