<script>
import { mapActions } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'
import { useMovieStore } from '../stores/movie'
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  data() {
    return {}
  },
  props: ['movie'],
  methods: {
    ...mapActions(useBookmarkStore, ['addToBookmark', 'removeBookmark']),
    ...mapActions(useMovieStore, ['fetchMovieDetail'])
  }
}
</script>

<template>
  <div class="card">
    <div>
      <img class="movieImage" :src="movie.imgUrl" />
    </div>

    <div class="paragraphElement">
      <div>
        <p>
          {{ movie.title }} <span><StarRating :rating="movie.rating" :show-rating="false" :star-size="20" :read-only="true"></StarRating></span>
        </p>
      </div>
    </div>

    <div>
      <button v-if="this.$route.name === 'home'" class="addButton" @click="addToBookmark(movie.id)">Bookmark</button>
      <button v-else-if="this.$route.name === 'bookmark'" class="addButton" @click="removeBookmark(movie.id)">Remove</button>
      <button class="addButton" @click="fetchMovieDetail(movie.id)">Details</button>
    </div>
  </div>
</template>
