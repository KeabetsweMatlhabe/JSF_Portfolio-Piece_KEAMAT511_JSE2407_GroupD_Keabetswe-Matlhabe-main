<template>
  <div>
    <nav class="bg-gray-500 border-gray-200">
      <!-- <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
          </button>
        </router-link>
        <button
          @click="toggleNavbar"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path>
          </svg>
        </button>
        <div :class="[isNavbarOpen ? 'block' : 'hidden', 'w-full md:block md:w-auto']" id="navbar-default">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0 md:border-0">
            <li>
              <router-link class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" to="/wishlist">Wishlist</router-link>
            </li>
            <li v-if="isAuthenticated">
              <div class="relative inline-block">
                <router-link to="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 stroke-white cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                  </svg>
                  <span class="absolute top-0 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">2</span>
                </router-link>
              </div>
            </li>
            <li v-if="isAuthenticated">
              <button @click="logout" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Logout</button>
            </li>
            <li v-else>
              <router-link class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div> -->
    </nav>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required placeholder="Enter your username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required placeholder="Enter your password" />
            <button type="button" @click="togglePasswordVisibility">{{ showPassword ? 'Hide' : 'Show' }}</button>
          </div>
        </div>
        <button type="submit" :disabled="loading">Login</button>
        <p v-if="loading" class="loading-message">Logging in, please wait...</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const isNavbarOpen = ref(false);
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('jwt');
    });

    onMounted(() => {
      // Redirect to login if not authenticated and trying to access any route other than login
      if (!isAuthenticated.value && router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    });

    const toggleNavbar = () => {
      isNavbarOpen.value = !isNavbarOpen.value;
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const logout = () => {
      localStorage.removeItem('jwt');
      router.push('/login');
    };

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        error.value = 'Username and password are required';
        return;
      }

      loading.value = true;
      error.value = null;

      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: username.value,
          password: password.value
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        });

        const token = response.data.token;
        localStorage.setItem('jwt', token);

        const redirectTo = router.currentRoute.value.query.redirect || '/';
        router.push(redirectTo);
      } catch (err) {
        error.value = 'Login failed. Please check your credentials and try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      isNavbarOpen,
      isAuthenticated,
      username,
      password,
      showPassword,
      loading,
      error,
      toggleNavbar,
      togglePasswordVisibility,
      logout,
      handleLogin
    };
  },
};
</script>

<style>
/* Navbar styles */
.bg-gray-500 {
  background-color: #6b7280;
}
.border-gray-200 {
  border-color: #e5e7eb;
}
.text-white {
  color: #ffffff;
}
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}
.hover\:text-blue-700:hover {
  color: #1d4ed8;
}

/* Login form styles */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.password-input {
  display: flex;
  align-items: center;
}

.password-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.password-input button {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  background-color: #f5f5f5;
  cursor: pointer;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.loading-message,
.error-message {
  margin-top: 10px;
  color: #ff0000;
}
</style>
