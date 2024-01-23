<template>
    <div class="container mt-5">
      <img src="@/assets/task.jpg" class="backgroundImage" alt="Background Image">
      <h2>Signup</h2>
      <form @submit.prevent="signup" class="col-md-6 mx-auto">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" type="text" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="email" type="email" id="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Signup</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
  
  export default {
    name: "SignUpView",
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      ...mapActions(['login']),
      async signup() {
        
        try {
        // Call  backend API to handle signup
        const response = await axios.post('/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
            // console.log('Signup successful', response.data);
            this.login(response.data);
            Swal.fire({
          title: response.data.message || "User Registered Successfully !",
          timerProgressBar: top,
          icon: "success",
          timer: 3000,
          
        });
        // Redirect to the login page 
        this.$router.push('/login');
        
          } catch (error) {
            Swal.fire({
          title: error.response.data.message || "SignUp Failed",
                timerProgressBar: toolbar,
          icon: "error",
          timer: 3000,
          
        });
        console.error('Signup failed', error.response.data);
        // Handle signup error (show error message, etc.)
      }

      },
    },
  };
  </script>
  