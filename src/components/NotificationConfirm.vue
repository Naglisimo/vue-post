<template>
<div class="modal">
  <div class="modal-background"></div>
  <div class="notification is-warning">
    <h1>Are you sure, you want to delete this? {{ id }}</h1>
    <button @click="$emit('deletePost', id)">Delete</button>
    <button @click="$emit('closeNotification')">Cancel</button>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      id: [Number, String]
    },
    created () {
      console.log('id from notification confirm', this.id)
    }
    
  }
</script>

<style lang="scss" scoped>

</style>