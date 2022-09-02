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
        <NotificationInfo
        :modalClass="deleteNotification ? 'is-active' : ''"
        :type="isInfoPrimary ? 'notification is-primary' : 'notification is-danger'">
        <template v-if="isInfoPrimary === true" v-slot:text> Deleted successfully! </template>
        <template v-else v-slot:text> Failed to delete! </template>
        </NotificationInfo>
        <NotificationInfo
        :modalClass="addEditNotification ? 'is-active' : ''"
        :type="isInfoPrimary ? 'notification is-primary' : 'notification is-danger'">
        <template v-if="isInfoPrimary === true" v-slot:text> Post updated successfully! </template>
        <template v-else v-slot:text> Failed to update post! </template>
        </NotificationInfo>
    </div>
</template>

<script>
import EventService from '../services/EventService'
import PostSummary from '@/components/PostSummary.vue'
import NotificationConfirm from '@/components/NotificationConfirm'
import NotificationInfo from '@/components/NotificationInfo';
import { deletePostMixin, notificationMixin } from '../mixins/fetchPostMixin'

export default {
  components: {
    PostSummary,
    NotificationConfirm,
    NotificationInfo
  },
  mixins: [deletePostMixin, notificationMixin],
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
