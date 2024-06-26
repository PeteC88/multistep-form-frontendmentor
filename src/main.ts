import { createApp } from 'vue'
import './style.css'
import '../src/assets/scss/main.scss';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'

const pinia = createPinia()
const app = createApp(App)

app.use(router);
app.use(pinia)
app.mount('#app')