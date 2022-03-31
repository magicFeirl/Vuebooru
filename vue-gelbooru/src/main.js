import {
  createApp
} from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'

import './assets/css/global.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import vLazy from './directives/vLazy'

const app = createApp(App)

app.directive('lazy', vLazy)

app.use(router).use(store).mount('#app')
