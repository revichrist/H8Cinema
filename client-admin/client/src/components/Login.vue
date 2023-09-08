<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: ['currentPage'],
  emits: ['login', 'changePage', 'googleLogin'],
  methods: {
    submitted() {
      const payload = {
        email: this.email,
        password: this.password
      }

      this.$emit('login', payload)
    },
    onChange(main, sub) {
      this.$emit('changePage', main, sub)
    },
    googleSignIn(data) {
      this.$emit('googleLogin', data.credential)
    }
  }
}
</script>

<template>
  <!-- LOGIN -->
  <form
    id="login-form"
    v-if="currentPage.main === 'login' && currentPage.subSection === 'login'"
    @submit.prevent="submitted"
  >
    <div class="containerLogin">
      <h2>Login</h2>
      <div>
        <label for="login-email">Email <span>*</span></label>
        <input
          v-model="email"
          type="text"
          name="email"
          id="login-email"
          placeholder="Enter your email..."
          autocomplete="off"
        />
      </div>

      <div>
        <label for="login-password">Password <span>*</span></label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="login-password"
          placeholder="Enter your password..."
          autocomplete="off"
        />
      </div>
      <button class="submitButton" type="submit">Login</button>

      <p v-if="currentPage.main === 'login' && currentPage.subSection === 'login'">
        Don't have an Account? Register
        <a class="linkDirection" @click="onChange('login', 'register')">Here</a>
      </p>

      <GoogleLogin :callback="googleSignIn" />
    </div>
  </form>


</template>
