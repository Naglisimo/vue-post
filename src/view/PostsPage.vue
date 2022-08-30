<template>
<div class="container is-fluid">
  <ModalAddEdit 
    :class="[ isEditOpen ? 'is-active' : '']"
    :id="selectedID"
    @closeModal="toggleOpenEdit(false)"
    @deletePost="deletePost($event)"/>
      <div class=" navbar level notification is-size-5 is-primary is-fixed-top">
      <div>
        <button 
          class="button is-info is-light"
          @click="toggleOpenEdit(0, true)"> Add new post </button>
      </div>
      <div class="field has-addons ">
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
    <input type="email" placeholder="What's your email" v-model="email"/>
        <NotificationConfirm 
        :class="[ isNotificationOpen ? 'is-active' : '']"
    :id="selectedID"
    @closeNotification="toggleNotification(false)"
    @deletePost="deletePost($event)"
    />

      <div class="section mt-6">
        <template v-if="posts.length">
        <PostSummary v-for="post in posts"
        :id="post.id"
        :key="post.id" 
        @openConfirmModal="toggleNotification($event, true)"
        @openAddEdit="toggleOpenEdit($event, true)"
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
import ModalAddEdit from '@/components/ModalAddEdit.vue'
import NotificationConfirm from '@/components/NotificationConfirm.vue'
import { fetchPostsMixin, deletePostMixin } from '../mixins/fetchPostMixin'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

library.add(faHatWizard)

export default {
  components: {
    PostSummary,
    NoPosts,
    ModalAddEdit,
    NotificationConfirm
  },
  mixins: [fetchPostsMixin, deletePostMixin],
  data () {
    return {
      name: 'PostPage',
      posts: [],
      searchInput: '',
      selectedID: 0,
      isNotificationOpen: false,
      isEditOpen: false,
      email: null
    }
  },
  methods: {
    search () {
      EventService.searchEvents(this.searchInput)
      .then(res => { this.posts = res.data })
      .catch(err => console.log(err))
    },
    deleteSmthng () {
      this.$notification.parentNode.removeChild(this.$notification);
      console.log('deletesomething')
    },
    // deleteEvent (id) {
    //   console.log('deleting id', id)
    //   // EventService.deleteEvent(id)
    // },
    toggleOpenEdit(event, boolean) {
      console.log(event, 'event', boolean, 'bool')
      if (event) {
      this.selectedID = event
      this.isEditOpen = boolean
      } else {
      this.selectedID = 0
      this.isEditOpen = boolean
      }
  },
    toggleNotification (event, boolean) {
      console.log('click', event, boolean)
      this.isNotificationOpen = boolean
      this.selectedID = event
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
