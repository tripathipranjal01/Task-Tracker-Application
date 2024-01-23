<!-- TaskForm.vue -->
<template>
  <div>
    <h2>Begin organizing your tasks</h2>
    <form @submit.prevent="createTask" class="col-md-6 mx-auto">
      <div class="mb-3">
        <img src="@/assets/form.jpg" class="backgroundImage" alt="Background Image">
        <label for="title" class="form-label">Title of the task</label>
        <input v-model="title" type="text" class="form-control" id="title" required />
        <label for="description" class="form-label mt-2">Description</label>
        <textarea v-model="description" type="text" class="form-control " id="description" required ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100">Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'TaskFormView',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    async createTask() {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          console.error("User not authenticated");
          return;
        }

        // Include the authentication token in the request headers
        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };
        // Call  backend API to add a new task
        const response = await axios.post('/tasks', { title: this.title, description: this.description }, { headers });
        Swal.fire({
          title: "New Task Added",
          timerProgressBar: top,
          icon: "success",
          timer: 3000,
          
        });
        console.log('Task added successfully', response.data);

        // Emit event to notify parent (TaskManager) about the added task
        this.$emit('taskAdded', response.data);

        // Clear form fields
        this.title = '';
        this.description = '';
      } catch (error) {
        Swal.fire({
          title: "Error while Adding Task !",
          timerProgressBar: top,
          icon: "error",
          timer: 3000,
          
        });
        console.error('Error adding task:', error.response.data);
        // Handle error adding task (show error message, etc.)
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 2em;
  text-align: center;
}
.backgroundImage {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>