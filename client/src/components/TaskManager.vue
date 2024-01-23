<template>
  <div class="container mt-5">
    <TaskForm @taskAdded="handleTaskAdded" />

    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";
import axios from "axios";

export default {
  name: "TaskManager",
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    const token = localStorage.getItem("token"); //  stored the token in local storage
    if (token) {
      this.fetchTasks();
    }
  },
  methods: {
    handleTaskAdded(task) {
      // Update  tasks array when a task is added
      this.tasks.push(task);
    },
    async fetchTasks() {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          console.error("User not authenticated");
          return;
        }

        // Include the authentication token in the request headers
        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };
        // Call  backend API to fetch tasks
        const response = await axios.get("/tasks", {headers});
        this.tasks = response.data;
      } catch (error) {
        console.error("Error loading tasks:", error);
        // Handle error loading tasks
      }
    },
  },
  components: { TaskForm, TaskList },
};
</script>

<style>
.container > h2 {
  text-align: center;
}
</style>
