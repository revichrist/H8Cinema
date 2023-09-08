<script>
  export default{
    props: ['movies', 'genres', 'currentPage']
  }
</script>

<template>
  <!-- Dashboard Section -->
  <section
      id="dashboard-section"
      v-if="currentPage.main === 'home' && currentPage.subSection === 'dashboard'"
    >
    <div class="containerDashboard">
      <h2>Dashboard</h2>

      <div>
        <h6>Total Movies</h6>
        <h1 id="total-movies">{{ movies.length }}</h1>
      </div>

      <div>
        <h6>Total Genres</h6>
        <h1 id="total-genres">{{ genres.length }}</h1>
      </div>
      
    </div>
      
    </section>
</template>