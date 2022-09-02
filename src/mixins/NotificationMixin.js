// import NotificationInfo from '../components/NotificationInfo.vue'

export const notificationMixin = {
  methods: {
    openNotificationPrimary () {
      this.isInfoOpen = true
      this.isInfoPrimary = true
      setTimeout(() => {
        this.isInfoOpen = false
        this.isInfoPrimary = false
      }, 2000)
    },
    openNotificationDanger () {
      this.isInfoOpen = true
      this.isInfoPrimary = false
      setTimeout(() => {
        this.isInfoOpen = false
        this.isInfoPrimary = false
      }, 2000)
    },
  }
}