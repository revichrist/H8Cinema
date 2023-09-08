<script>
export default {
  props: ['buttonText', 'movieId'],
  emits: ['changePage', 'editMovie'],
  methods: {
    onClick() {
      if(this.buttonText === 'Add Movies'){
        this.$emit('changePage', 'home', 'addMovie')
      }else if(this.buttonText === 'Edit'){
        this.$emit('editMovie', this.movieId)
      }
      
    }
  }
}
</script>

<template>
  <button class="submitButton" @click="onClick">{{ this.buttonText }}</button>
</template>
