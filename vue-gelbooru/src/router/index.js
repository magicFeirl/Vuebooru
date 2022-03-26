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
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (parseInt(to.query.pid) === 0) {
      return {
        top: 0
      };
    }
  }
})

export default router
