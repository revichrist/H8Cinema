<script>
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { mapActions } from 'pinia'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  methods: {
    ...mapActions(useUserStore, ['loginChecker'])
  },
  created() {
    this.loginChecker()
  }
}
</script>

<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
</template>

<style>
a {
  cursor: pointer;
}

.card {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 400px;
  margin-right: 40px;
  margin-top: 20px;
  display: inline-block;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.movieImage {
  width: 250px;
  height: 250px;
  object-fit: cover;
  object-position: center;
}

.paragraphElement {
  display: flex;
  margin: 0 0 0 0;
  padding: 10px 10px 10px 10px;
}

.paragraphElement p {
  display: inline-block;
  font-family: arial;
  font-weight: bold;
  font-size: 22px;
  margin-top: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.containerPages {
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.containerPages a {
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  color: black;
  font-weight: 600;
  width: 20px;
  text-align: center;
}

.containerButton {
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.addButton {
  color: white;
  background-color: salmon;
  font-size: 10px;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: opacity 0.15s;
}

.addButton:hover {
  opacity: 0.9;
}

.addButton:active {
  opacity: 0.7;
}

.active {
  background-color: salmon;
}

/* For Login Form */
.containerLogin {
  margin: auto;
  margin-top: 100px;
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
</style>
