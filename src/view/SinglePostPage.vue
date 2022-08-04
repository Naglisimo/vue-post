<template>
    <div class="section">
        <PostSummary>
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
    </div>
</template>

<script>
import EventService from '../services/EventService'
import PostSummary from '@/components/PostSummary.vue';

export default {
  components: {
    PostSummary
  },
  props: {
    id: [Number, String]
  },
  data () {
    return {
      name: 'SinglePostPage',
      post: []
    }
  },
  created () {
    return EventService.fetchEvent(this.id).then(res => this.post =res.data)
  }
}
</script>
