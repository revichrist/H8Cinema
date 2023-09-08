<script>
import { mapActions, mapState } from 'pinia'
import { useMovieStore } from '../stores/movie'
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  methods: {
    ...mapActions(useMovieStore, ['fetchMovieDetail', 'generateCode'])
  },
  computed: {
    ...mapState(useMovieStore, ['movieDetail', 'qrSVG'])
  },
  created() {
    this.fetchMovieDetail(this.$route.params.id)

    this.generateCode('https://cinema-gc3-p2.web.app/details/'+this.$route.params.id)
  }
}
</script>

<template>
  <div class="container my-4 position-relative">
    <img class="w-25" :src="movieDetail.imgUrl" alt="" />
    <div v-html="qrSVG" style="width: 200px; display: inline-block;"></div>
    <div class="position-absolute">
      <h1>{{ movieDetail.title }}</h1>
      <p>Genre: {{ movieDetail.Genre.name }}</p>
      <span class="h-25">{{ movieDetail.synopsis }}</span>
      <StarRating
        :read-only="true"
        :rating="movieDetail.rating"
        :show-rating="false"
        :star-size="30"
      ></StarRating>
    </div>
  </div>
</template>

<style>
.diInline{
  display: inline-block;
}
</style>