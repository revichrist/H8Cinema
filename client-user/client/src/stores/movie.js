import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
const BASE_URL = 'http://localhost:3000'
export const useMovieStore = defineStore('movie', {
  state() {
    return {
      movies: [],
      movieDetail: {},
      qrSVG: '',
      totalPage: 1,
      totalData: 0
    }
  },
  getters: {
    totalPageInArray() {
      const pageInArray = []

      for (let i = 1; i <= this.totalPage; i++) {
        pageInArray.push(i)
      }

      return pageInArray
    }
  },
  actions: {
    async fetchMovies(page = 1, genres = {}) {
      try {
        let filter = ''

        for (const key in genres) {
          filter += genres[key] + '%'
        }

        const url = `${BASE_URL}/cust/movies?currentPage=${page}&genreFilter=${filter}`

        const { data } = await axios({
          method: 'GET',
          url
        })

        this.totalPage = data.totalPage
        this.totalData = data.totalData
        this.movies = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async fetchMovieDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/cust/movies/${id}`
        })

        this.movieDetail = data.data

        router.push(`/details/${id}`)
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async generateCode(link='https://www.tokopedia.com/'){
      try {
        const {data} = await axios({
          method: 'POST',
          url: `${BASE_URL}/cust/movies/generateCode`,
          data: {
            link
          }
        })
    
        this.qrSVG = data    
      } catch (error) {
        console.log(error, 70)
      }
    }
  }
})
