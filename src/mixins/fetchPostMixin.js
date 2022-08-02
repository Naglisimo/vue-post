import EventService from "@/services/EventService"

// export let fetchPostsMixin = {

//   created () {
//     console.log('this is mixin')
//     EventService.fetchEvents()
//       .then(res => { this.posts = res.data })
//       .catch(err => console.log(err))
//   }
// }

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
  // data () {
  //   return {
  //     isModalOpen: false,
  //   }
  // },
  methods: {
    deletePost (id) {
      EventService.deleteEvent(id)
        .then(() => {
          console.log('deleted', this.isModalOpen)
          // this.isModalOpen = false
        })
    }
  }
}