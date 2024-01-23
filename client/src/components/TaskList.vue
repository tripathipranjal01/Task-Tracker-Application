Certainly! Here's an updated version of the code with a more unique and customized appearance for the "Mark Completed" confirmation alert:

```html
<template>
  <div class="mt-5">
    <div class="text-center" v-if="tasks.length === 0">
     
    </div>
    <div class="task-cards">
      <div v-for="task in tasks" :key="task._id" class="task-card">
        <h3>{{ task.title }}</h3>
        <p class="card-subtitle text-wrap" :class="{ 'completed-description': task.completed }">
          {{ task.description }}
        </p>
        <div class="actions">
          <button v-if="!task.completed" @click="completeTask(task._id)">Mark Completed</button>
          <button :class="{'btn-del': task.completed}" @click="deleteTask(task._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "TaskListView",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteTask(taskId) {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          console.error("User not authenticated");
          return;
        }

        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };
        const confirmed = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (confirmed.isConfirmed) {
          const response = await axios.delete(`/tasks/${taskId}`, { headers });
          this.$emit("taskDeleted", taskId);
          await Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          window.location.reload();
          console.log("Task Deleted Successfully", response.data);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error deleting task:", error.response.data);
      }
    },
    async completeTask(taskId) {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          Swal.fire({
            title: "UnAuthorized!",
            text: "User Not Authenticated.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          return;
        }
        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };

        const marked = await Swal.fire({
          title: "Confirmation",
          html:
            "<p>Are you sure you want to mark this task as completed?</p>" +
            "<p>This action cannot be undone.</p>",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#4CAF50",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Mark It DONE!",
          cancelButtonText: "Cancel",
        });

        if (marked.isConfirmed) {
          const response = await axios.patch(
            `/tasks/complete/${taskId}`,
            { id: taskId, completed: true },
            { headers }
          );
          this.$emit("Task Completed", taskId);
          console.log("Task Marked As Completed", response.data);
          window.location.reload();

          await Swal.fire({
            title: "Task Completed!",
            text: "Your Task Has been Marked As Completed!",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Your Task Has Not been Marked As Completed!",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });
        console.error("Error completing task:", error.response.data);
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

.task-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.task-card {
  width: 45%;
  background-color: #d9d432;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.completed-task {
  background-color: dimgray !important;
  color: aliceblue;
  text-decoration: line-through;
}

.completed-description {
  color: beige;
}

.btn-del {
  text-decoration: none !important;
}

@media (max-width: 500) {
  body {
    font-size:

 15px;
    margin: 0;
    padding: 0;
  }
}
</style>
```

This version includes an HTML description in the "Mark Completed" confirmation alert, providing more information and a visually enhanced confirmation message. Feel free to further customize the appearance and content according to your preferences.