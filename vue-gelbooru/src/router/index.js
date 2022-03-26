import {
  createRouter,
  createWebHistory
} from 'vue-router'

import PostList from '../views/PostList.vue'

const routes = [{
  path: '/',
  component: PostList
}]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
