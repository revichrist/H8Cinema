<script>
import ReusableButton from './ReusableButton.vue'
export default {
  components: {
    ReusableButton
  },
  props: ['movie', 'index', 'currentPage', 'genre', 'log', 'genres'],
  emits: ['editMovie', 'editStatus'],
  data() {
    return {
      status: '',
      role: ''
    }
  },
  methods: {
    timeFormatter(time) {
      const waktu = new Date(time)
      return waktu.toLocaleString('en-US')
    },
    onEditMovie(id) {
      this.$emit('editMovie', id)
    },
    onEditStatus(id) {
      this.$emit('editStatus', id, this.status)
    }
  },
  created() {
    if (this.movie) {
      this.status = this.movie.status
    }
    this.role = localStorage.getItem('role')
    
  }
}
</script>

<template>
  <tr v-if="currentPage.main === 'home' && currentPage.subSection === 'movies'" class="trBody">
    <td>{{ index + 1 }}</td>
    <td>{{ movie.title }}</td>
    <td>{{ movie.Genre.name }}</td>
    <td>
      <img :src="movie.imgUrl" :alt="movie.title" />
    </td>
    <td>{{ movie.synopsis }}</td>
    <td v-if="this.role === 'Admin'">
      <select @change="onEditStatus(movie.id)" v-model="status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Archieved">Archieved</option>
      </select>
    </td>
    <td v-else>
      <p>{{ this.status }}</p>
    </td>
    <td>
      <ReusableButton
        :movieId="movie.id"
        :buttonText="'Edit'"
        @editMovie="onEditMovie"
      ></ReusableButton>
    </td>
  </tr>

  <tr v-if="currentPage.main === 'home' && currentPage.subSection === 'genres'" class="trBody">
    <td>{{ index + 1 }}</td>
    <td>{{ genre.name }}</td>
  </tr>

  <tr v-if="currentPage.main === 'home' && currentPage.subSection === 'logs'" class="trBody">
    <td>{{ index + 1 }}</td>
    <td>{{ log.name }}</td>
    <td>{{ log.description }}</td>
    <td>{{ timeFormatter(log.createdAt) }}</td>
    <td>{{ log.updatedBy }}</td>
  </tr>
</template>
