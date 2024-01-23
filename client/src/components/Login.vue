<template>
  <div class="container mt-5">
    <img src="@/assets/task.jpg" class="backgroundImage" alt="Background Image">
    <h2>Login</h2>
    <form @submit.prevent="signin" class="col-md-6 mx-auto">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async signin() {
      try {
        // Call backend API to handle login
        const response = await axios.post("/auth/signin", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        // Call the login action
        this.login(response.data);
        // Redirect to the task list
        this.$router.push("/tasks");
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "error",
          timer: 3000,
        });
        console.error("Login failed", error.response.data.message);
        // Handle login error (show error message, etc.)
      }
    },
  },
};
</script>

<style>
.container {
  position: relative;
}

.backgroundImage {
  height: 200%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.container > h2 {
  text-align: center;
}
</style>
