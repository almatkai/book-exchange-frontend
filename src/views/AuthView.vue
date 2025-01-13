// src/views/Login.vue
<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
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
                <div class="form-group" v-if="!isLogin">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        v-model="confirmPassword" 
                        required 
                        placeholder="Confirm your password"
                    >
                </div>
                <button type="submit" class="submit-btn">
                    {{ isLogin ? 'Login' : 'Register' }}
                </button>
            </form>
            <p class="auth-link">
                {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                <router-link :to="isLogin ? '/register' : '/login'">
                    {{ isLogin ? 'Register' : 'Login' }}
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AuthView',

    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            isLogin: true
        }
    },

    created() {
        this.isLogin = this.$route.path === '/login';

        console.log("SAS: ", this.$route.path);
        
    },

    watch: {
        '$route.path'(newPath) {
            this.isLogin = newPath === '/login';
        }
    },

    methods: {
        async handleSubmit() {
            if (!this.isLogin && this.password !== this.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const endpoint = this.isLogin ? 'login' : 'register';
            const payload = {
                email: this.email,
                password: this.password
            };
            
            try {
                const response = await this.$api.post(endpoint, payload);
                console.log("response: ", response)
                if (response.data.token) {
                    this.login(response.data);
                    this.$router.push('/books');
                }
            } catch (error) {
                console.error(`${this.isLogin ? 'Login' : 'Registration'} failed:`, error);
                alert(`${this.isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
            }
        },
        ...mapActions(['login'])
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