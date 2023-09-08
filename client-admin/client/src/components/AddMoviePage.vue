<script>
import FormMovie from './FormMovie.vue';
export default{
  components:{
    FormMovie
  },  
  props: ['currentPage', 'genres'],
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
    v-if="currentPage.main === 'home' && currentPage.subSection === 'addMovie'"
  >
  <FormMovie :formType="'Add Movie'" :genres="genres" @submit="onSubmit"></FormMovie>
  </section>
</template>
