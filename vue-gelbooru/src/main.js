import {
  createApp
} from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'

import './assets/css/global.css'

import vLazy from './directives/vLazy'
import messageBox from './hooks/useMessageTip'


const app = createApp(App)

app.directive('lazy', vLazy)

app.use(router).use(store).use(messageBox).mount('#app')
