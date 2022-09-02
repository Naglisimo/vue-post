import router from "@/router"
import EventService from "@/services/EventService"

export const fetchPostsMixin = {
  methods: {
    fetchMethod () {
      console.log('fetch was executed')
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
        .then(() => {
          if (this.$route.name !== 'home') {
            this.isNotificationOpen = false
            this.isInfoOpen = true
            this.isInfoPrimary = true
            setTimeout(() => {
              this.isInfoOpen = false
              this.isInfoPrimary = false
              router.push({ name: 'home' })
            }, 2000)
          } else {
            this.isNotificationOpen = false
            this.fetchMethod()
          }
          this.openNotificationPrimary('Post deleted!')
        })
        .catch(() => {
          console.log('error')
          this.openNotificationDanger('Post failed to delete!')
        })
    }
  }
}

export const addEditPostMixin = {
  methods: {
    submitPost () {
      const date = new Date()
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
      if (this.id) {
        const updatedEvent = {
          title: this.title,
          author: this.author,
          body: this.postBody,
          updated_at: formattedDate
        }
        EventService.updateEvent(this.id, updatedEvent)
          .then(() => {
            this.$emit('fetchData')
            this.$emit('alertPrimary', 'Post updated successfully!')
          }).catch(() => this.$emit('alertDanger', 'Failed to update post!'))
      } else {
        const createdEvent = {
          title: this.title,
          author: this.author,
          body: this.postBody,
          created_at: formattedDate
        }
        EventService.createEvent(createdEvent).then(res => {
          console.log(res)
          this.$emit('fetchData')
          this.$emit('alertPrimary', 'Post created successfully!')
        }).catch(() => this.$emit('alertDanger', 'Failed to create post!'))
      }
      this.$emit('closeModal')
    }
  }
}

export const notificationMixin = {
  data () {
    return {
      deleteNotification: false,
      addEditNotification: false,
      isInfoPrimary: true,
    }
  },
  methods: {
    openNotificationPrimary (notificationText) {
      this.notificationText = notificationText
      this.deleteNotification = true
      this.isInfoPrimary = true
      setTimeout(() => {
        this.deleteNotification = false
        this.isInfoPrimary = false
      }, 2000)
    },
    openNotificationDanger (notificationText) {
      console.log('danger')
      this.notificationText = notificationText
      this.isInfoOpen = true
      this.isInfoPrimary = false
      setTimeout(() => {
        this.isInfoOpen = false
        this.isInfoPrimary = false
      }, 2000)
    },
  }
}