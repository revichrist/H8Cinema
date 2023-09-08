import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '642052098395-cr7i5rm8kvcvllko2mqqcg65r6qcnnf8.apps.googleusercontent.com'
})

app.mount('#app')
