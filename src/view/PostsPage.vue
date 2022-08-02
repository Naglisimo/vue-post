<template>
<div class="container is-fluid">
      <div class="level-item notification is-primary">
      <div class="field has-addons">
        <p class="control">
          <input @onChange="search" class="input" type="text" placeholder="Find a post" v-model="searchInput">
        </p>
        <p class="control">
          <button class="button" @click="search">
            Search
          </button>
        </p>
      </div>
    </div>
      <div class="section">
        <template v-if="posts.length">
        <PostSummary v-for="post in posts" :key="post.id">
          <template v-slot:title>
            {{post.title}}
          </template>
          <template v-slot:author>
            {{post.author}}
          </template>
          <template v-slot:time>
            {{post.updated_at ? post.updated_at : post.created_at}}
          </template>
          </PostSummary>
        </template>
        <template v-else>
          <NoPosts>
            <template v-slot:text>
              There is no available posts, <router-link :to="{ name: 'home' }"> let's go back!</router-link>
            </template>
          </NoPosts>
        </template>
      </div>
</div>
</template>

<script>
import EventService from '../services/EventService'
import PostSummary from '../components/PostSummary.vue'
import NoPosts from '../components/NoPosts.vue'

export default {
  components: {
    PostSummary,
    NoPosts
  },
  data () {
    return {
      name: 'PostPage',
      posts: [],
      searchInput: ''
    }
  },
  methods: {
    search () {
      console.log(this.searchInput)
      // const regex = new RegExp(this.searchInput)
      // this.posts = this.posts.filter(post =>  regex.test(post.body) || regex.test(post.author) )
    EventService.searchEvents(this.searchInput).then(res => { this.posts = res.data }).catch(err => console.log(err))
    console.log(this.posts)
    }
  },
  created () {
    EventService.fetchEvents().then(res => { this.posts = res.data }).catch(err => console.log(err))
  }
}
</script>
