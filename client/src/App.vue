<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light  bg-info-subtle sticky-top ">
      <div class="container">
        <router-link to="/" class="navbar-brand"><strong>Task Tracker</strong></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="nav-link text-uppercase">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/signup" class="nav-link text-uppercase">Signup</router-link>
            </li>
            <li v-if="isAuthenticated " class="nav-item">
              <button @click="logout" class="nav-link text-uppercase">Logout</button>
            </li>
          </ul>
        </div> 
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters( ['isAuthenticated']),
  },
  created() {
    this.$store.dispatch('initAuth')
  },
  methods: {
    async logout() {
      
      await this.$store.dispatch('logout');
    },
    ...mapActions( ['logout']),
  }
 
}
</script>

<style>

</style>
