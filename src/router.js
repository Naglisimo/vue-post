import Router from 'vue-router'
import PostsPage from '@/view/PostsPage.vue'
import SinglePostPage from '@/view/SinglePostPage.vue'
import NotFound from '@/view/NotFound.vue'
import ExamplePage from '@/view/ExamplePage.vue'
import Vue from 'vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostsPage
    },
    {
      path: '/post/:id',
      name: 'post',
      component: SinglePostPage,
      props: true
    },
    {
      path: '/example',
      name: 'example',
      component: ExamplePage,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

export default router
