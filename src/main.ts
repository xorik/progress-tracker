import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {createHead} from "unhead";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const head = createHead()
app.mount('#app')
