<script>
import FormMovie from './FormMovie.vue';
export default{
  components: {
    FormMovie
  },
  props: ['currentPage', 'genres', 'movieDetail'],
  emits: ['submit'],
  methods:{
    onSubmit(payload){
      this.$emit('submit', payload)
    }
  }
}
</script>

<template>
  <section
    id="add-or-edit-movie-section"
    v-if="currentPage.main === 'home' && currentPage.subSection === 'editMovie'"
  >
  <FormMovie :formType="'Edit Movie'" :genres="genres" :movieDetail="movieDetail" @submit="onSubmit"></FormMovie>
  </section>
</template>
