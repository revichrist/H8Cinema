import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from 'axios'
import { toast } from '../utils/toast'
import route from '@/router'

const BASE_URL = 'http://localhost:3000'
export const useBookmarkStore = defineStore('bookmark', {
  state() {
    return {
      bookmarks: []
    }
  },
  actions: {
    async fetchBookmark() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/cust/bookmark`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        
        this.bookmarks = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },
    async removeBookmark(id) {
      try {
        const {data} = await axios({
          method: 'DELETE',
          url: `${BASE_URL}/cust/bookmark/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        toast(data.message, 'success')
        this.fetchBookmark()
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async addToBookmark(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/cust/bookmark/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        
        toast(data.message, 'success')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    }
  }
})
