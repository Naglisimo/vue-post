<template>
<div class="container is-fluid">
  <ModalConfirm 
    :class="[ isModalOpen ? activeClass : '']"
    :id="selectedID"
    @closeModal="toggleModal(false)"
    @deleteEvent="deleteEvent()"/>
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
    </div >
      <div class="section">
        <template v-if="posts.length">
        <PostSummary v-for="post in posts"
        :id="post.id"
        :key="post.id" 
        @openConfirmModal="toggleModal($event, true)"
        >
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
import ModalConfirm from '@/components/ModalConfirm.vue'
import { fetchPostsMixin, deletePostMixin } from '../mixins/fetchPostMixin'


export default {
  components: {
    PostSummary,
    NoPosts,
    ModalConfirm
  },
  mixins: [fetchPostsMixin, deletePostMixin],
  data () {
    return {
      name: 'PostPage',
      posts: [],
      searchInput: '',
      activeClass: 'is-active',
      selectedID: 0,
      isModalOpen: false
    }
  },
  methods: {
    search () {
      EventService.searchEvents(this.searchInput)
      .then(res => { this.posts = res.data })
      .catch(err => console.log(err))
    },
    // deleteEvent (id) {
    //   console.log('deleting id', id)
    //   // EventService.deleteEvent(id)
    // },
    toggleModal(event, boolean) {
      this.selectedID = event
      this.isModalOpen = boolean
  }
  },
  created () {
    this.fetchMethod()
    // EventService.fetchEvents()
    // .then(res => { this.posts = res.data })
    // .catch(err => console.log(err))
  }
}
</script>
