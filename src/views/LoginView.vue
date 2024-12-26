// src/views/Login.vue
<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Login</h2>
            <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Email</label>
                <input 
                type="email" 
                v-model="email" 
                required 
                placeholder="Enter your email"
                >
            </div>
            <div class="form-group">
                <label>Password</label>
                <input 
                type="password" 
                v-model="password" 
                required 
                placeholder="Enter your password"
                >
            </div>
            <button type="submit" class="submit-btn">Login</button>
            <button type="submit" class="submit-btn" @click="connectCheck()">Backend Check</button>
            </form>
            <p class="auth-link">
            Don't have an account? 
            <router-link to="/register">Register</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'LoginView',
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleSubmit = async () => {
        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful login
            localStorage.setItem('token', 'dummy-token')
            router.push('/books')
        } catch (error) {
            console.error('Login failed:', error)
        }
        }

        return {
            email,
            password,
            handleSubmit
        }
    },
    methods: {
        connectCheck() {
            console.log('connectCheck')
            fetch('http://localhost:3000/api/v1/books')
            .then(response => response.json())
            .then(data => console.log(data))
        }
    }
}
</script>

<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px);
    padding: 2rem;
}

.auth-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
}

.submit-btn:hover {
    background-color: #3aa876;
}

.auth-link {
    text-align: center;
    margin-top: 1rem;
}

.auth-link a {
    color: #42b983;
    text-decoration: none;
}
</style>