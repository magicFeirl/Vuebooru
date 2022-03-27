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
    const [pid, search] = newValues;

    const dest = {
      path: '/',
      query: {
        pid,
        search
      }
    }

    if (pid === 0) {
      router.push(dest)
    } else {
      router.replace(dest)
    }
  })
}
