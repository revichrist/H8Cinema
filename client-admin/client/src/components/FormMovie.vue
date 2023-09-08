<script>
export default {
  data() {
    return {
      title: '',
      genreId: '',
      synopsis: '',
      imgUrl: '',
      trailerUrl: '',
      rating: 0
    }
  },
  props: ['genres', 'formType', 'movieDetail'],
  emits: ['submit'],
  methods: {
    onSubmit() {
      const payload = {
        title: this.title,
        genreId: this.genreId,
        synopsis: this.synopsis,
        imgUrl: this.imgUrl,
        trailerUrl: this.trailerUrl,
        rating: this.rating
      }
      
      this.$emit('submit', payload)
    }
  },
  created(){
    if(this.movieDetail){
      this.title = this.movieDetail.title
      this.genreId = this.movieDetail.genreId
      this.synopsis = this.movieDetail.synopsis
      this.imgUrl = this.movieDetail.imgUrl
      this.trailerUrl = this.movieDetail.trailerUrl
      this.rating = this.movieDetail.rating
    }
  }
}
</script>

<template>
  <div class="containerForm">
    <h2>{{ formType }}</h2>
    <form id="movie-form" @submit.prevent="onSubmit">
      <div>
        <label for="movie-title">Title <span>*</span></label>
        <input
          v-model="title"
          type="text"
          name="title"
          id="movie-title"
          placeholder="Enter your movie title"
          autocomplete="off"
          
        />
      </div>

      <div>
        <label for="movie-genre">Genre <span>*</span></label>
        <select v-model="genreId">
          <option value="" selected disabled>-- Select Genre --</option>
          <option v-for="(genre, index) in genres" :key="index" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="movie-synopsis">Synopsis <span>*</span></label>
        <textarea
          v-model="synopsis"
          name="synopsis"
          id="movie-synopsis"
          cols="30"
          rows="10"
          placeholder="Enter movie synopsis"
          
        ></textarea>
      </div>

      <div>
        <label for="movie-image">Image <span>*</span></label>
        <input
          v-model="imgUrl"
          type="text"
          name="image"
          id="movie-image"
          placeholder="Enter movie image url"
          autocomplete="off"
          
        />
      </div>

      <div>
        <label for="movie-trailer">Trailer <span>*</span></label>
        <input
          v-model="trailerUrl"
          type="text"
          name="trailer"
          id="movie-trailer"
          placeholder="Enter movie trailer url"
          autocomplete="off"
          
        />
      </div>

      <div>
        <label for="movie-rating">Rating <span>*</span></label>
        <input
          v-model="rating"
          type="number"
          name="rating"
          id="movie-rating"
          placeholder="Enter movie rating"
          
        />
      </div>

      <button class="submitButton" type="submit">Submit</button>
    </form>
  </div>
    
  
</template>
