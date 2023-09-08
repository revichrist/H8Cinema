<script>
import TableRow from './TableRow.vue'
import ReusableButton from './ReusableButton.vue'

export default {
  components: {
    TableRow,
    ReusableButton
  },
  props: ['currentPage', 'movies', 'genres'],
  emits: ['changePage', 'addMovie', 'editMovie', 'editStatus'],
  methods: {
    onChange(main, sub) {
      this.$emit('changePage', main, sub)
    },
    onEditMovie(id) {
      this.$emit('editMovie', id)
    },
    onEditStatus(id, status) {
      this.$emit('editStatus', id, status)
    }
  }
}
</script>

<template>
  <!-- Movie Section -->
  <section
    id="movie-section"
    v-if="currentPage.main === 'home' && currentPage.subSection === 'movies'"
  >
    <div class="containerTable">
      <h2>Movies</h2>
      <ReusableButton :buttonText="'Add Movies'" @changePage="onChange"></ReusableButton>

      <div>
        <table>
          <thead >
            <tr class="trHead">
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Image</th>
              <th>Synopsis</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="movie-table">
            <TableRow
              v-for="(movie, index) in movies"
              :movie="movie"
              :index="index"
              :currentPage="currentPage"
              @editMovie="onEditMovie"
              @editStatus="onEditStatus"
            ></TableRow>
            
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style>
img {
  width: 75px;
}
</style>
