import {
  watch
} from 'vue'
import {
  useRoute,
  useRouter
} from 'vue-router'

export default function (pid, search) {
  const router = useRouter()

  watch([pid, search], (newValues, oldValues) => {
    router.replace({
      path: '/',
      query: {
        pid: newValues[0],
        search: newValues[1]
      }
    })
  })
}
