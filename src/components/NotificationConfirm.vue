<template>
<div class="modal">
  <div class="modal-background"></div>
  <div class="notification is-info">
    <h1 class="is-size-4">Are you sure, you want to delete this? {{ id }}</h1>
    <button @click="$emit('deletePost', id)" class="button is-danger">Delete</button>
    <button @click="$emit('closeConfirmModal', null)" class="button is-success">Cancel</button>
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