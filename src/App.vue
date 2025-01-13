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
          <router-link to="/notifications" class="nav-item">Notifications</router-link>
          <a class="nav-item" @click="logout">Logout</a>
          <a class="nav-item" >{{ userData?.username || 'Username Missing' }}</a>
        </template>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['isAuthenticated', "userData"]),
  },
  methods: {
    ...mapActions(['logout', 'setUserData']),

    async getUserData() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await this.$api.get('user-data');
                const userData = response.data
                if (response.status === 200) {
                    this.setUserData(userData);
                    this.$router.push('/books');
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.getUserData();
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