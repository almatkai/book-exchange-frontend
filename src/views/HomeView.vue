// src/views/Home.vue
<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-4">
          {{ msg }}
        </h1>
        <p class="text-h6 mb-6">
          Share your favorite books with the community and discover new reads
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-12">
      <v-col cols="12" md="8">
        <v-card class="mx-auto">
          <v-card-text>
            <div class="text-center mb-4">
              <v-icon size="64" color="primary">mdi-book-open-page-variant</v-icon>
            </div>
            <h2 class="text-h5 text-center mb-6">How it works</h2>
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <v-icon color="primary" size="36" class="mb-2">mdi-book-plus</v-icon>
                  <h3 class="text-h6 mb-2">List Your Books</h3>
                  <p>Add books you'd like to share with others</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <v-icon color="primary" size="36" class="mb-2">mdi-account-switch</v-icon>
                  <h3 class="text-h6 mb-2">Connect</h3>
                  <p>Find readers with similar interests</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <v-icon color="primary" size="36" class="mb-2">mdi-swap-horizontal</v-icon>
                  <h3 class="text-h6 mb-2">Exchange</h3>
                  <p>Meet up and exchange books locally</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h5 mb-6">Get Started</h2>
        <v-btn
          color="primary"
          size="large"
          class="mx-2"
          to="/register"
          prepend-icon="mdi-account-plus"
        >
          Sign Up
        </v-btn>
        <v-btn
          color="secondary"
          size="large"
          class="mx-2"
          to="/books"
          prepend-icon="mdi-book-search"
        >
          Browse Books
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col cols="12">
        <v-divider></v-divider>
        <div class="text-center pt-4">
          <v-btn
            v-for="link in links"
            :key="link.text"
            :href="link.href"
            target="_blank"
            variant="text"
            class="mx-2"
          >
            {{ link.text }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    msg: {
      type: String,
      default: 'Welcome to BookSwap'
    }
  },
  data() {
    return {
      links: [
        { text: 'About Us', href: '#' },
        { text: 'How It Works', href: '#' },
        { text: 'Safety Guidelines', href: '#' },
        { text: 'Community Rules', href: '#' },
        { text: 'Contact', href: '#' }
      ]
    }
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>