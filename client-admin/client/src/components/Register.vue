<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    }
  },
  props: ['currentPage'],
  emits: ['registerSubmit', 'changePage'],
  methods: {
    onSubmit() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address
      }

      this.$emit('registerSubmit', payload)
    },
    onChange(main, sub) {
      this.$emit('changePage', main, sub)
    }
  }
}
</script>

<template>
  <!-- REGISTER -->
  <form
    id="register-form"
    v-if="currentPage.main === 'login' && currentPage.subSection === 'register'"
    @submit.prevent="onSubmit()"
  >
    <div class="containerLogin" id="justForRegister">
      <h2>Register</h2>
      <div>
        <label for="register-username">Username</label>
        <input
          v-model="username"
          type="text"
          name="username"
          id="register-username"
          placeholder="Enter your username..."
          autocomplete="off"
        />
      </div>

      <div>
        <label for="register-email">Email <span>*</span></label>
        <input
          v-model="email"
          type="text"
          name="email"
          id="register-email"
          placeholder="Enter your email..."
          autocomplete="off"
        />
      </div>

      <div>
        <label for="register-password">Password <span>*</span></label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="register-password"
          placeholder="Enter your password..."
        />
      </div>

      <div>
        <label for="register-phone">Phone number</label>
        <input
          v-model="phoneNumber"
          type="text"
          name="phoneNumber"
          id="register-phone"
          placeholder="Enter your phone number..."
          autocomplete="off"
        />
      </div>

      <div>
        <label for="register-address">Address</label>
        <input
          v-model="address"
          type="text"
          name="address"
          id="register-address"
          placeholder="Enter your address..."
          autocomplete="off"
        />
      </div>

      <button class="submitButton" type="submit">Sign Up</button>
      <p v-if="currentPage.main === 'login' && currentPage.subSection === 'register'">
        Already have an Account?
        <a class="linkDirection" @click="onChange('login', 'login')">Log in</a>
      </p>
    </div>
  </form>
</template>

<style>
#justForRegister{
  height: 550px;
  width: 30%;

}
</style>