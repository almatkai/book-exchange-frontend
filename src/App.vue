// src/App.vue
<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-logo">BookSwap</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/books" class="nav-item">Browse Books</router-link>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-item">Login</router-link>
          <router-link to="/register" class="nav-item">Register</router-link>
        </template>
        <template v-else>
          <router-link to="/my-books" class="nav-item">My Books</router-link>
          <a @click="logout" class="nav-item">Logout</a>
        </template>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const isAuthenticated = ref(false)
    const router = useRouter()

    const logout = () => {
      isAuthenticated.value = false
      localStorage.removeItem('token')
      router.push('/login')
    }

    return {
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.nav-item:hover {
  color: #42b983;
}
</style>