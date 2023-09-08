import { defineStore } from 'pinia'
import { useMovieStore } from './movie'
import { toast } from '../utils/toast'
import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://localhost:3000'
// untuk action akan dikirimin pake ...mapActions
// untuk state akan dikirimin pake ...mapState
export const useUserStore = defineStore('user', {
  state() {
    return {
      access_token: ''
    }
  },

  actions: {
    async login(payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/cust/login`,
          data: payload
        })
        this.access_token = data.access_token
        localStorage.setItem('access_token', data.access_token)
        toast('Hello!', 'success')

        router.push('/')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async googleLogin(credentials){
      try {
        const {data} = await axios({
          method: 'POST',
          url: `${BASE_URL}/cust/googleLogin`,
          headers: {
            google_token: credentials
          }
        })

        this.access_token = data.access_token
        localStorage.setItem('access_token', data.access_token)
        toast('Hello!', 'success')

        router.push('/')
      } catch (error) {
        const errorMessage = error.response.data.message
        toast(errorMessage, 'error')
      }
    },

    async register(payload){
      try {
        const {data} = await axios({
          method: 'POST',
          url: `${BASE_URL}/cust/register`,
          data: payload
        })

        toast(data.message, 'success')
        router.push('/login')
      } catch (error) {
        const errorMessage = error.response.data.message
        let handleMessage
        if(typeof errorMessage === 'object'){
          handleMessage = errorMessage.join('\n\n')
        }else{
          handleMessage = errorMessage
        }

        toast(handleMessage, 'error')
      }
    },

    loginChecker() {
      if (localStorage.getItem('access_token')) {
        this.access_token = localStorage.getItem('access_token')
      }
    },

    logout() {
      localStorage.clear()
      this.access_token = ''
      toast('See ya!')
      router.push('/')
    }
  },

  getters: {
    isLoggedIn() {
      if (this.access_token) return true

      return false
    }
  }
})
