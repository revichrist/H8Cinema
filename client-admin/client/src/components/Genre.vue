<script>
import TableRow from './TableRow.vue'
export default {
  components: {
    TableRow
  },
  props: ['genres', 'currentPage']
}
</script>

<template>
  <!-- Genre Section -->
  <section
    id="genre-section"
    v-if="currentPage.main === 'home' && currentPage.subSection === 'genres'"
  >
  <div class="containerTable">
    <h2>Genres</h2>
    <table>
      <thead>
        <tr class="trHead">
          <th>#</th>
          <th>Genre</th>
        </tr>
      </thead>

      <tbody id="genre-table">
        <TableRow
          v-for="(genre, index) in genres"
          :genre="genre"
          :index="index"
          :currentPage="currentPage"
        ></TableRow>
      </tbody>
    </table>
  </div>
    
  </section>
</template>
