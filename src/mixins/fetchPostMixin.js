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
        .then(() => {
          this.isModalOpen = false
          this.fetchMethod()
        })
    }
  }
}