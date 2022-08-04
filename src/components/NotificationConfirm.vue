<template>
  <div class="notification is-warning">
    <h1>Are you sure, you want to delete this? </h1>
    <button @click="$emit('deletePost', id)">Delete</button>
    <button @click="$emit('closeNotification')">Cancel</button>
  </div>
</template>

<script>
  export default {
    props: {
      id: [Number, String]
    }
    
  }
</script>

<style lang="scss" scoped>

</style>