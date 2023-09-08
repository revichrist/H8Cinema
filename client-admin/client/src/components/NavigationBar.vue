<script>
export default {
  data() {
    return {
      username: 'Udin',
      role: 'CEO'
    }
  },
  methods: {
    onChangePage(main, sub) {
      this.$emit('changePage', main, sub)
    },
    logout() {
      this.$emit('logout')
    }
  },
  props: ['currentPage'],
  emits: ['changePage', 'logout'],
  created() {
    this.username = localStorage.getItem('username')
    this.role = localStorage.getItem('role')
  }
}
</script>
<template>
  <!-- NavBar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary boxShadow-border">
    <div class="container-fluid">
      <a class="navbar-brand" @click="onChangePage('home', 'dashboard')">Cinema8</a>
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
            <a
              class="nav-link"
              :class="{
                active: currentPage.main === 'home' && currentPage.subSection === 'dashboard'
              }"
              aria-current="page"
              @click="onChangePage('home', 'dashboard')"
              >Dashboard</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              @click="onChangePage('home', 'movies')"
              :class="{
                active:
                  (currentPage.main === 'home' && currentPage.subSection === 'movies') ||
                  currentPage.subSection === 'addMovie' ||
                  currentPage.subSection === 'editMovie'
              }"
              >Movies</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              @click="onChangePage('home', 'genres')"
              :class="{
                active: currentPage.main === 'home' && currentPage.subSection === 'genres'
              }"
              >Genres</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              @click="onChangePage('home', 'logs')"
              :class="{ active: currentPage.main === 'home' && currentPage.subSection === 'logs' }"
              >History</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
      <div>
        <h6>
          Hello, {{ username }}! <span style="margin-left: 20px">({{ role }})</span>
        </h6>
      </div>
    </div>
  </nav>
  <!-- End of NavBar -->
</template>
