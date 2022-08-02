<template>
    <div>
        Single post {{ id }}
    </div>
</template>

<script>
import EventService from '../services/EventService'
export default {
  props: {
    id: String
  },
  data () {
    return {
      name: 'SinglePostPage',
      data: []
    }
  },
  created () {
    return EventService.fetchEvent(this.id).then(res => console.log(res))
  }
}
</script>
