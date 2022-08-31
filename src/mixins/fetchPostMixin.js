import router from "@/router"
import EventService from "@/services/EventService"

export const fetchPostsMixin = {
  methods: {
    fetchMethod () {
      EventService.fetchEvents()
        .then(res => { this.posts = res.data })
        .catch(err => console.log(err))
    }
  }
}

export const deletePostMixin = {

  methods: {
    deletePost (id) {
      EventService.deleteEvent(id)
        .then((res) => {
          console.log(res)
          console.log(this.$route.name)
          if (this.$route.name !== 'home') {
            router.push({ name: 'home' })
          } else {
            this.isNotificationOpen = false
            this.fetchMethod()
          }
          this.isInfoOpen = true
          this.isInfoPrimary = true
          setTimeout(() => {
            this.isInfoOpen = false
            this.isInfoPrimary = false
          }, 2000)
        })
        .catch(() => {
          this.isInfoOpen = true
          this.isInfoPrimary = false
          setTimeout(() => {
            this.isInfoOpen = false
            this.isInfoPrimary = false
          }, 2000)
        })
    }
  }
}