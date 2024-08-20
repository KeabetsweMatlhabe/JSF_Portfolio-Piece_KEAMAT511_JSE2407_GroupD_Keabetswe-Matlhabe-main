<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div class="mt-1">
              <input id="username" name="username" type="text" required v-model="username"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div class="mt-1 relative">
              <input :type="showPassword ? 'text' : 'password'" id="password" name="password" required v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your password" />
              <button type="button" @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>

        <p v-if="error" class="mt-2 text-center text-sm text-red-600">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('jwt');
    });

    onMounted(() => {
      if (isAuthenticated.value && router.currentRoute.value.path === '/login') {
        router.push('/');
      }
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
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

    // Watch for changes in authentication status
    watch(isAuthenticated, (newValue) => {
      if (!newValue) {
        router.push('/login');
      }
    });

    return {
      username,
      password,
      showPassword,
      loading,
      error,
      togglePasswordVisibility,
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
