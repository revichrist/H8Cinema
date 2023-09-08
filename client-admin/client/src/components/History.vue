<script>
import TableRow from './TableRow.vue'

export default {
  components: {
    TableRow
},
  props: ['logs', 'currentPage']
}
</script>

<template>
  <!-- Logs section -->
  <section
    id="logs-section"
    v-if="currentPage.main === 'home' && currentPage.subSection === 'logs'"
  >
  <div class="containerTable">
    <h2>History</h2>
    <table>
      <thead>
        <tr class="trHead">
          <th>#</th>
          <th>Activity</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Updated By</th>
        </tr>
      </thead>

      <tbody id="logs-table">
        <TableRow v-for="(log, index) in logs" :log="log" :index="index" :currentPage="currentPage"></TableRow>
      </tbody>
    </table>
  </div>
   
  </section>
</template>
