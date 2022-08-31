<template>
    <div class="section">
        <PostSummary
        @openConfirmModal="toggleNotification($event, true)"
        :id="id">
          <template v-slot:title>
            {{post.title}}
          </template>
          <template v-slot:body>
            {{post.body}}
          </template>
          <template v-slot:author>
            {{post.author}}
          </template>
          <template v-slot:time>
            {{post.updated_at ? post.updated_at : post.created_at}}
          </template>
        </PostSummary>
        <NotificationConfirm 
        :class="[ isNotificationOpen ? 'is-active' : '']"
        :id="id"
        @closeConfirmModal="toggleNotification($event, false)"
        @deletePost="deletePost($event)"
        />
    </div>
</template>

<script>
import EventService from '../services/EventService'
import PostSummary from '@/components/PostSummary.vue'
import NotificationConfirm from '@/components/NotificationConfirm.vue'
import { deletePostMixin } from '../mixins/fetchPostMixin'

export default {
  components: {
    PostSummary,
    NotificationConfirm
  },
  mixins: [deletePostMixin],
  props: {
    id: [Number, String]
  },
  data () {
    return {
      name: 'SinglePostPage',
      post: [],
      isNotificationOpen: false
    }
  },
  methods: {
      toggleNotification (event, boolean) {
      console.log('click', event, boolean)
      this.isNotificationOpen = boolean
      this.selectedID = event
    }
  },
  async created () {
    const res = await EventService.fetchEvent(this.id)
    return this.post=res.data
  }
}
</script>
