import axios from 'axios'
import {
  useNProgress
} from '@vueuse/integrations/useNProgress'
import {
  message
} from '../hooks/useMessageTip';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8889',
  withCredentials: true
})

const {
  isLoading
} = useNProgress(null, {
  showSpinner: false
})

http.interceptors.request.use((config) => {
  isLoading.value = true;
  return config;
}, (config) => {
  isLoading.value = false;
  message('Server Error: ' + config.code, '', 5000);
  return config;
})

http.interceptors.response.use((config) => {
  isLoading.value = false;
  return config
});

export async function get_posts(pid, tags = '', limit = 42) {
  const {
    data
  } = await http.get('', {
    params: {
      pid,
      tags,
      limit
    }
  })

  return data;
}

export async function get_posts_tags(pid) {
  const {
    data
  } = await http.get('/post', {
    params: {
      id: pid
    }
  })

  return data
}

export async function login(username, password) {
  const {
    data
  } = await http.post('/login', {
    username,
    password
  })

  return data
}

export async function favorite(pid) {
  const {
    data
  } = await http.get('/favorite', {
    params: {
      id: pid
    }
  })

  return data
}

export async function unfavorite(pid) {
  const {
    data
  } = await http.get('/unfavorite', {
    params: {
      id: pid
    }
  })

  return data
}

export async function save_search(search) {
  const {
    data
  } = await http.post('/save_search?search=' + search)

  return data
}
