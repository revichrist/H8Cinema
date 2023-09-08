<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router'

export default {
  methods: {
    ...mapActions(useUserStore, ['logout']),
    
    changePage(page) {
      this.$router.push(page)
    }
  },
  
  computed: {
    ...mapState(useUserStore, ['isLoggedIn'])
  }
}
</script>

<template>
  <!-- NavBar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary boxShadow-border">
    <div class="container-fluid">
      <a class="navbar-brand">Cinema8</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" :class="{active: this.$route.name === 'home'}">Home</RouterLink>
          </li>

          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" @click="changePage('/bookmark') " :class="{active: this.$route.name === 'bookmark'}">Bookmark</a>
          </li>
          
        </ul>
      </div>
      
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <RouterLink v-if="!isLoggedIn" class="nav-link" to="/login" :class="{active: this.$route.name === 'login'}" >Login</RouterLink>
          <RouterLink v-if="!isLoggedIn" class="nav-link" to="/register" :class="{active: this.$route.name === 'register'}">Register</RouterLink>
          <a v-if="isLoggedIn" class="nav-link" @click="logout">Logout</a>
        </ul>
      </div>

    </div>
  </nav>
  <!-- End of NavBar -->
</template>

