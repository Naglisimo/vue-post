import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json'
  },
  timeout: 10000
})

export default {
  fetchEvents () {
    return apiClient.get('/posts')
  },
  fetchEvent (id) {
    return apiClient.get(`/posts/${id}`)
  },
  searchEvents (text) {
    return apiClient.get(`/posts?q=${text}`)
  },
  deleteEvent (id) {
    return apiClient.delete(`/posts/${id}`)
  },
  createEvent (event) {
    return apiClient.post(`/posts`, event)
  }
}
