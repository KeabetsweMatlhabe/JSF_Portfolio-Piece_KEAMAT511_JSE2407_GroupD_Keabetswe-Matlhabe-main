<template>
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
      <p v-if="loading">Logging in, please wait...</p>
      <p v-if="error">{{ error }}</p>
    </form>
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
}

.form-group {
  margin-bottom: 20px;
}

.password-input {
  display: flex;
}

.password-input input {
  flex: 1;
}

.password-input button {
  margin-left: 10px;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
