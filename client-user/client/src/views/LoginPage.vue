<script>
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'googleLogin']),
    
  }
}
</script>

<template>
  <LoginForm @submit="login" :formType="'Login'" @gLogin="googleLogin"></LoginForm>

</template>

<style></style>
