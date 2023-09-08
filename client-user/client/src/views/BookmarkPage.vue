<script>
import { mapActions, mapState } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'
import ReusableCard from '../components/ReusableCard.vue'
export default {
  components: {
    ReusableCard
  },
  methods: {
    ...mapActions(useBookmarkStore, ['fetchBookmark'])
  },
  computed: {
    ...mapState(useBookmarkStore, ['bookmarks'])
  },
  created() {
    this.fetchBookmark()
  }
}
</script>

<template>
  <div class="container">
    <h2 class="text-center">My Movie List</h2>
    <ReusableCard v-for="movie in bookmarks" :movie="movie.Movie"></ReusableCard>
  </div>
</template>

<style></style>
