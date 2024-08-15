<template>
  <div>
    <nav class="bg-gray-500 border-gray-200">
     
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
