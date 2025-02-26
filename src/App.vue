// src/App.vue
<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-logo">BookSwap</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item">
          <i class="mdi mdi-home"></i> <!-- Home Icon -->
        </router-link>
        <router-link to="/books" class="nav-item">
          <i class="mdi mdi-bookshelf"></i> <!-- Browse Books Icon -->
        </router-link>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-item">Login</router-link>
          <router-link to="/register" class="nav-item">Register</router-link>
        </template>
        <template v-else>
          <router-link to="/notifications" class="nav-item">
            <i class="mdi mdi-bell"></i> <!-- Notifications Icon -->
          </router-link>

          <div class="dropdown" @mouseenter="startHover" @mouseleave="endHover">
            <a class="nav-item dropdown-toggle">
              <span v-if="userData && userData.username">{{ userData.username }}</span>
              <span v-else>User</span>
              <i class="mdi mdi-account-circle"></i> <!-- User Icon -->
            </a>
            <div v-if="isHovered && userData" class="dropdown-content">
              <router-link to="/profile" class="dropdown-item">
                <i class="mdi mdi-account"></i> Profile <!-- Profile Icon -->
              </router-link>
              <router-link to="/settings" class="dropdown-item">
                <i class="mdi mdi-cog"></i> Settings <!-- Settings Icon -->
              </router-link>
              <a class="dropdown-item" @click="logout">
                <i class="mdi mdi-logout"></i> Logout <!-- Logout Icon -->
              </a>
            </div>
          </div>

          <router-link to="/new-request" class="new-request-btn">
            Swap Book
          </router-link>

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
  data() {
    return {
      isHovered: false,
      hoverTimeout: null,
    };
  },
  computed: {
    ...mapState('auth', ['isAuthenticated', 'userData']),
  },
  methods: {
    ...mapActions('auth', ['logout', 'setUserData']),

    startHover() {
      this.hoverTimeout = setTimeout(() => {
        this.isHovered = true;
      }, 300); // 0.3 seconds delay
    },

    endHover() {
      clearTimeout(this.hoverTimeout);
      this.isHovered = false;
    },

    async getUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Fetching user data...');
          const response = await this.$api.get('/v2user-data');
          console.log('User data response: ', response);
          const userData = response.data;
          if (response.status === 200) {
            this.setUserData(userData);
            this.$router.push('/books');
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    },
  },
  created() {
    console.log('App created');
    console.log('this.isAuthenticated: ', this.isAuthenticated);
    if (this.isAuthenticated) {
      this.getUserData();
      console.log('User is authenticated, with userData: ', this.userData);
    }
  },
};
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
  padding: 0.8rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  cursor: pointer;
  font-size: 1.2rem;
}

.nav-item:hover {
  color: #42b983;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  left: 0;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
}
</style>
