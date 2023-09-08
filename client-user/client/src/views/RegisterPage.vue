<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
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
    ...mapActions(useUserStore, ['register', 'googleLogin'])
  }
}
</script>

<template>
  <LoginForm @submit="register" :formType="'Register'" @gLogin="googleLogin"></LoginForm>
</template>

<style></style>
