import {
  ref,
  watch
} from 'vue'

import {
  get_posts
} from '../api'


export default function (pid, search, posts) {
  let loading = ref(false);

  watch(
    [pid, search],
    (newValues, oldValues) => {
      // 搜索发生变化
      if (oldValues[1] !== undefined && newValues[1] !== oldValues[1]) {
        pid.value = 0;
        posts.value = [];
      }

      loading.value = true;

      get_posts(pid.value, search.value).then((data) => {
        if (pid.value === 0) {
          posts.value = data['post'];
        } else {
          posts.value.push(...data['post']);
        }
      }).finally(() => {
        loading.value = false;
      });
    }, {
      immediate: true,
    }
  );

  return loading
}
