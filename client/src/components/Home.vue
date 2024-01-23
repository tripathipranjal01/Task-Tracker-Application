<template>
    <div class="container  ">
      <h2 data-v-8dc7cce2="" class="mt-5 mb-5" style="color: white;">Welcome To Task Tracker</h2>
      <div>
        <img src="@/assets/task.jpg" class="backgroundImage" alt="Background Image">
        <router-link to="/login" class="btn btn-primary w-25">Login</router-link> |
        
        <router-link to="/signup" class="btn btn-success w-25">Signup</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
  };
  </script>
  <style scoped>
  .container {
    display: flex ;
    flex-direction: column;
    justify-content: center;
    height: 70vh;
    text-align: center;
  }

  .backgroundImage{
    height: 80%;
    width: 100%;
    z-index: -5;
  }
  </style>
  