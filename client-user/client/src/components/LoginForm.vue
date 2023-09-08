<script>

export default {
  data() {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  emits: ['submit', 'gLogin'],
  props: ['formType'],
  methods: {
    onSubmit(payload) {
      this.$emit('submit', payload)
    },
    handleGoogleLogin(credentials){
      this.$emit('gLogin', credentials.credential)
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit(payload)">
    <div class="containerLogin">
      <h2>{{ formType }}</h2>
      <div>
        <label>Email</label>
        <input type="text" v-model="payload.email" placeholder="Input your email" />
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="payload.password" placeholder="Input your password" />
      </div>
      <button class="submitButton" type="submit">Submit</button>
      <p v-if="this.$route.name === 'login'">
        Don'h have an account? Register <span><RouterLink to="/register">Here</RouterLink></span>
      </p>

      <p v-else>
        Already Have an account? Login <span><RouterLink to="/login">Here</RouterLink></span>
      </p>
      <GoogleLogin :callback="handleGoogleLogin"/>
    </div>
  </form>
</template>
