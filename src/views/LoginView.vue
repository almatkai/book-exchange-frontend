// src/views/Login.vue
<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Login</h2>
            <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Email</label>
                <input 
                type="login" 
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
            </form>
            <p class="auth-link">
            Don't have an account? 
            <router-link to="/register">Register</router-link>
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginView',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        async handleSubmit() {
            try {
                console.log('Logging in...')
                console.log(this.$axios)
                const response = await this.$api.post('login', {
                    username: this.email,
                    password: this.password
                })
                console.log('Login response:', response)
                if (response.data.token) {
                    // Store the token in localStorage
                    localStorage.setItem('token', response.data.token)
                    // Redirect to books page
                    this.$router.push('/books')
                }
            } catch (error) {
                console.error('Login failed:', error)
                // Handle different error cases
                if (error.response) {
                    // Server responded with error
                    alert(error.response.data.message || 'Invalid credentials')
                } else if (error.request) {
                    // No response received
                    alert('No response from server. Please try again later.')
                } else {
                    // Request setup error
                    alert('An error occurred. Please try again.')
                }
            }
        }
    },
    
}
</script>
// setup() {
    //     const email = ref('')
    //     const password = ref('')
    //     const router = useRouter()
    //     const { proxy } = getCurrentInstance()  // Get access to the component instance

    //     const handleSubmit = async () => {
    //         try {
    //             console.log('Logging in...')
    //             console.log(proxy.$axios)
    //             const response = await proxy.$api.post('login', {
    //                 username: email.value,
    //                 password: password.value
    //             })
    //             console.log('Login response:', response)
    //             if (response.data.token) {
    //                 // Store the token in localStorage
    //                 localStorage.setItem('token', response.data.token)
    //                 // Redirect to books page
    //                 router.push('/books')
    //             }
    //         } catch (error) {
    //             console.error('Login failed:', error)
    //             // Handle different error cases
    //             if (error.response) {
    //                 // Server responded with error
    //                 alert(error.response.data.message || 'Invalid credentials')
    //             } else if (error.request) {
    //                 // No response received
    //                 alert('No response from server. Please try again later.')
    //             } else {
    //                 // Request setup error
    //                 alert('An error occurred. Please try again.')
    //             }
    //         }
    //     }

    //     return {
    //         email,
    //         password,
    //         handleSubmit
    //     }
    // }
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