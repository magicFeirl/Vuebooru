import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:8889'
})

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
