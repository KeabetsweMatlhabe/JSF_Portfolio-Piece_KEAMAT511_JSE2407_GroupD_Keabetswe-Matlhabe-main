import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import { useWishlistStore } from './composables/useWishlistStore'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const wishlistStore = useWishlistStore()
wishlistStore.syncWithAPI()

app.mount('#app')