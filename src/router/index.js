// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
// import Register from '../views/Register.vue'
// import Books from '../views/Books.vue'
// import MyBooks from '../views/MyBooks.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: Register
    // },
    // {
    //     path: '/books',
    //     name: 'Books',
    //     component: Books
    // },
    // {
    //     path: '/my-books',
    //     name: 'MyBooks',
    //     component: MyBooks,
    //     meta: { requiresAuth: true }
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router