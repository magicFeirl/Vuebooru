import {
  ref,
  watch
} from 'vue'

import {
  get_posts
} from '../api'


export default function (pid, search, posts) {
  watch(
    [pid, search],
    (newValues, oldValues) => {
      // 搜索发生变化
      if (newValues[1] !== oldValues[1]) {
        pid.value = 0;
      }

      get_posts(pid.value, search.value).then((data) => {
        if (pid.value === 0) {
          posts.value = data['post'];
        } else {
          posts.value.push(...data['post']);
        }
      });
    }, {
      immediate: true,
    }
  );
}
