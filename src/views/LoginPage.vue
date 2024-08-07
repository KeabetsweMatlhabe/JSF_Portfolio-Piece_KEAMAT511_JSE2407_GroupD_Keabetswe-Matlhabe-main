<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/wishList">Wish List</router-link>
      <router-link to="/cart">Cart</router-link>
      <button @click="logout" v-if="loggedIn">Logout</button>
      <router-link to="/login" v-else>Login</router-link>
    </nav>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
            <button type="button" @click="togglePasswordVisibility">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
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

export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      error: null,
    };
  },
  computed: {
    loggedIn() {
      return !!localStorage.getItem('jwt');
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      if (!this.username || !this.password) {
        this.error = 'Username and password are required';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: this.username,
          password: this.password
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        });

        const token = response.data.token;
        localStorage.setItem('jwt', token);
        this.$router.push(this.$route.query.redirect || '/');
      } catch (err) {
        this.error = 'Login failed. Please check your credentials and try again.';
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
    }
  }
};
</script>

<style>
/* Add styles for the login form */
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
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.password-input button:hover {
  background-color: #0056b3;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0056b3;
}

.loading-message, .error-message {
  margin-top: 20px;
  font-size: 14px;
}

.error-message {
  color: red;
}

.loading-message {
  color: green;
}

/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
}

.navbar button:hover {
  text-decoration: underline;
}
</style>
