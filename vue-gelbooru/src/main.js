import {
  createApp
} from 'vue'

import router from './router'

import App from './App.vue'

import './assets/css/global.css'
import vLazy from './directives/vLazy'

const app = createApp(App)

app.directive('lazy', vLazy)

app.use(router).mount('#app')
