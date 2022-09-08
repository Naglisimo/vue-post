import router from "@/router"
import EventService from "@/services/EventService"

export const fetchPostsMixin = {
  data () {
    return {
      totalPagesArray: []
    }
  },
  methods: {
    paginate (res) {
      this.totalPages = res.headers.link.split(',').map(arr => arr.split(';'))
      const lastPage = this.totalPages.map(arr => arr.map(inner => { if (inner.match(/last/)) { return arr } })).flat().filter(arr => arr !== undefined).flat()
      if (lastPage.length) {
        const lastPageNumber = lastPage[0].match(/page=([0-9])/)[1]
        this.totalPagesArray = []
        for (let i = 1; i <= lastPageNumber; i++) {
          this.totalPagesArray.push(i)
        }
      } else { this.totalPagesArray }
      this.posts = res.data
    },
    fetchMethod (page) {
      EventService.fetchEvents(page !== undefined ? page : 1)
        .then(res => {
          this.paginate(res)
        })
        .catch(err => {
          this.openNotificationDanger(err)
        })
    }
  }
}

export const deletePostMixin = {
  methods: {
    deletePost (id, currentPage) {
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
            this.fetchMethod(currentPage)
          }
          this.openNotificationPrimary('Post deleted!')
        })
        .catch(() => {
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
        EventService.createEvent(createdEvent).then(() => {
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
      this.notificationText = notificationText
      this.deleteNotification = true
      this.isInfoPrimary = false
      setTimeout(() => {
        this.deleteNotification = false
        this.isInfoPrimary = false
      }, 2000)
    },
  }
}