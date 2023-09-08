<script>
import { useMovieStore } from '../stores/movie'
import { mapActions, mapState } from 'pinia'

import ReusableCard from '../components/ReusableCard.vue'

export default {
  data() {
    return {
      currentPage: 1,
      availableGenre: ['Romance', 'Action', 'Horror', 'Thriller'],
      selectedGenre: {}
    }
  },

  components: {
    ReusableCard
  },

  methods: {
    ...mapActions(useMovieStore, ['fetchMovies']),

    changePage(page) {
      this.currentPage = page
      this.fetchMovies(page, this.selectedGenre)
    },

    filterGenre(genre) {
      this.currentPage = 1
      

      if (!this.selectedGenre[genre]) {
        this.selectedGenre[genre] = genre
      } else {
        delete this.selectedGenre[genre]
      }
      
      this.fetchMovies(this.currentPage, this.selectedGenre)
    }
  },

  computed: {
    ...mapState(useMovieStore, ['movies', 'totalPageInArray', 'totalData'])
  },

  created() {
    this.fetchMovies()
  }
}
</script>

<template>
  <div class="containerButton">
    <button
      class="btn btn-primary btn-sm"
      :class="{ active: selectedGenre[genre] }"
      v-for="genre in availableGenre"
      @click="filterGenre(genre)"
    >
      {{ genre }}
    </button>
  </div>

  <div class="container">
    <ReusableCard v-for="movie in movies" :movie="movie"></ReusableCard>
  </div>
  

  <div class="containerPages">
    <a
      :class="{ active: this.currentPage === page }"
      v-for="page in totalPageInArray"
      @click="changePage(page)"
      >{{ page }}</a
    >
  </div>
</template>
