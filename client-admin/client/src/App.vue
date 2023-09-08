<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import NavBar from './components/NavBar.vue'
import Dashboard from './components/Dashboard.vue'
import Movies from './components/Movies.vue'
import FormMovie from './components/FormMovie.vue'
import Genre from './components/Genre.vue'
import History from './components/History.vue'
import AddMoviePage from './components/AddMoviePage.vue'
import EditMoviePage from './components/EditMoviePage.vue'

export default {
  components: {
    Login,
    Register,
    NavBar,
    Dashboard,
    Movies,
    FormMovie,
    Genre,
    History,
    AddMoviePage,
    EditMoviePage
  },

  data() {
    return {
      BASE_URL: 'http://localhost:3000',
      // BASE_URL: 'https://movies-server.cinema-gc1-p2.cloud',
      currentPage: {
        main: 'login',
        subSection: 'login'
      },
      username: '',
      role: '',
      movieData: [],
      genreData: [],
      logsData: [],
      movieDetail: {}
    }
  },

  methods: {
    changePage(main, sub) {
      this.currentPage.main = main
      this.currentPage.subSection = sub
    },

    submitMovie(main, sub) {
      console.log(this.movieInput)
      this.currentPage.main = main
      this.currentPage.subSection = sub
    },
    toastNotification(message, icon) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: icon,
        title: message
      })
    },
    async login(payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/login`,
          data: payload
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username || data.email)
        localStorage.setItem('role', data.role)

        this.toastNotification(`Welcome! ${data.username || data.email}`, 'success')
        this.loginChecker()
      } catch (error) {
        const errorMessage = error.response.data.message

        this.toastNotification(errorMessage, 'error')
      }
    },
    async googleLogin(credentials) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/google-sign-in`,
          headers: {
            google_token: credentials
          }
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username || data.email)
        localStorage.setItem('role', data.role)

        this.toastNotification(`Welcome! ${data.username || data.email}`, 'success')
        this.loginChecker()
      } catch (error) {
        const errorMessage = error.response.data.message
        this.toastNotification(errorMessage, 'error')
      }
    },
    async registerSubmit(data) {
      try {
        await axios({
          method: 'POST',
          url: `${this.BASE_URL}/register`,
          data
        })

        this.toastNotification('new user registered', 'success')
        this.changePage('login', 'login')
      } catch (error) {
        const errorMessage = error.response.data.message

        if (typeof errorMessage === 'string') {
          this.toastNotification(errorMessage, 'error')
        } else {
          const msgToUser = errorMessage.join('\n\n')
          this.toastNotification(msgToUser, 'error')
          
        }
      }
    },

    async fetchMovies() {
      try {
        const access_token = localStorage.getItem('access_token')
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/movies`,
          headers: {
            access_token
          }
        })

        this.movieData = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
      }
    },

    async fetchGenre() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/genres`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.genreData = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
      }
    },

    async fetchHistory() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/histories`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.logsData = data.data
      } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
      }
    },

    async editStatus(id, status) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${this.BASE_URL}/movies/${id}`,
          data: { status },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.toastNotification(data.message, 'success')
        this.fetchMovies()
        this.fetchHistory()
      } catch (error) {
        const errorMessage = error.response.data.message
        this.toastNotification(errorMessage, 'error')
      }
    },

    async addMovie(payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/movies`,
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.toastNotification(
          `A new movie "${payload.title}" has been created with ID:${data.data.id}`,
          'success'
        )
        this.fetchHistory()
        this.fetchMovies()
        this.changePage('home', 'movies')
      } catch (error) {
        const errorMessage = error.response.data.message
        const msgToUser = errorMessage.join('\n\n')
        this.toastNotification(msgToUser, 'error')
      }
    },
    async fetchMovieDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/movies/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.movieDetail = data.data
        this.changePage('home', 'editMovie')
      } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
      }
    },
    async editMovie(payload) {
      try {
        const { data } = await axios({
          method: 'PUT',
          url: `${this.BASE_URL}/movies/${this.movieDetail.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        this.toastNotification(data.message, 'success')
        this.fetchMovies()
        this.fetchHistory()
        this.changePage('home', 'movies')
      } catch (error) {
        const errorMessage = error.response.data.message
        const msgToUser = errorMessage.join('\n\n')
        this.toastNotification(msgToUser, 'error')
      }
    },
    loginChecker() {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        this.fetchMovies()
        this.fetchGenre()
        this.fetchHistory()

        this.username = localStorage.getItem('username')
        this.role = localStorage.getItem('role')
        this.changePage('home', 'dashboard')
      } else {
        this.changePage('login', 'login')
      }
    },

    logout() {
      this.toastNotification(`See you later! ${this.username} 👋`)
      localStorage.clear()
      this.loginChecker()
    }
  },

  created() {
    this.loginChecker()
  }
}
</script>

<template>
  <!-- login and register -->
  <section id="login-section" v-if="currentPage.main === 'login'">
    <Login
      :currentPage="currentPage"
      @login="login"
      @changePage="changePage"
      @googleLogin="googleLogin"
    ></Login>

    <Register
      :currentPage="currentPage"
      @registerSubmit="registerSubmit"
      @changePage="changePage"
    ></Register>
  </section>

  <!-- Home section -->
  <section id="home-section" v-if="currentPage.main === 'home'">
    <!-- <NavBar :currentPage="currentPage" @changePage="changePage" @logout="logout"></NavBar> -->

    <Dashboard :movies="movieData" :genres="genreData" :currentPage="currentPage"></Dashboard>

    <Movies
      :currentPage="currentPage"
      :movies="movieData"
      @editStatus="editStatus"
      @changePage="changePage"
      @editMovie="fetchMovieDetail"
    ></Movies>

    <AddMoviePage :currentPage="currentPage" :genres="genreData" @submit="addMovie"></AddMoviePage>

    <EditMoviePage
      :currentPage="currentPage"
      :genres="genreData"
      :movieDetail="movieDetail"
      @submit="editMovie"
    ></EditMoviePage>

    <Genre :genres="genreData" :currentPage="currentPage"></Genre>

    <History :currentPage="currentPage" :logs="logsData"></History>
  </section>
</template>

<style>
/* global */
a {
  cursor: pointer;
}

h2 {
  margin-bottom: 30px;
}

.submitButton {
  border: none;
  background-color: salmon;
  height: 40px;
  width: 120px;
  margin-top: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  transition: opacity 0.3s;
}

.submitButton:hover {
  opacity: 0.8;
}

.submitButton:active {
  opacity: 0.6;
}
/* end of global */

/* For login section */
.containerLogin {
  margin: auto;
  margin-top: 150px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  height: 450px;
  border-radius: 20px;
  box-shadow: 0 1px 6px rgba(57, 73, 76, 0.35);
}

.containerLogin label {
  display: block;
  font-weight: 500;
}

.containerLogin div {
  margin-top: 10px;
  margin-bottom: 10px;
}

.containerLogin span {
  color: red;
}

.containerLogin input {
  border: none;
  border-bottom: 2px solid #999;
  border-bottom-color: hsla(60, 3%, 13%, 0.193);
  width: 250px;
  outline: none;
}

.containerLogin input:focus {
  border-bottom-color: hsla(14, 75%, 40%, 0.598);
}

.linkDirection {
  text-decoration: underline;
  color: blue;
}
/* end of login section */

/* NavBar */
.active {
  background-color: salmon;
  font-weight: 500;
}

.boxShadow-border {
  box-shadow: 0 1px 6px rgba(57, 73, 76, 0.35);
}
/* end of NavBar */

/* Dashboard */
.containerDashboard {
  width: 80%;
  margin-left: 20px;
  margin-top: 20px;
}

.containerDashboard div {
  padding: 10px 5px 5px 10px;
  margin-top: 20px;
  box-shadow: 0px 1px 6px rgba(57, 73, 76, 0.35);
  width: 15%;
  height: 150px;
  border-radius: 15px;
}
/* end of Dashboard */

/* Table */
.containerTable {
  width: 80%;
  margin-left: 20px;
  margin-top: 20px;
}

.trHead {
  border-bottom: 1px solid black;
  border-bottom-color: hsla(60, 3%, 13%, 0.573);
}

.trHead th {
  font-size: 20px;
  padding-left: 20px;
  padding-top: 10px;
}

.trBody {
  color: black;
  border-bottom: 1px solid black;
  border-bottom-color: hsla(60, 3%, 13%, 0.193);
}

.trBody td {
  padding-left: 20px;
  padding-top: 30px;
  padding-bottom: 5px;
}
/* end of Table */

/* Form Movie */
.containerForm {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.containerForm textarea {
  background-color: hsla(0, 0%, 87%, 0.537);
  padding: 10px;
  border-radius: 5px;
  border: 2px solid transparent;
  outline: none;
  line-height: 1.5;
  height: 200px;
}

.containerForm input {
  border: none;
  border-bottom: 2px solid #999;
  border-bottom-color: hsla(60, 3%, 13%, 0.193);
  outline: none;
  width: 40%;
}
.containerForm input:focus {
  border-bottom-color: hsla(14, 75%, 40%, 0.598);
}

.containerForm label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
}

.containerForm div {
  margin-bottom: 20px;
}

.containerForm span {
  color: red;
}

/* end of form movie */
</style>
