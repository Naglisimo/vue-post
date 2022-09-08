<template>
<div class="modal">
  <!-- <div class="modal-background"></div> -->
  <div class="notification has-background-primary-light">
    <h1 class="is-size-4 has-text-dark">Are you sure, you want to delete this?</h1>
    <button @click="$emit('deletePost', id)" class="button is-danger is-outlined mt-2 mr-2">Delete</button>
    <button @click="$emit('closeConfirmModal', null)" class="button is-outlined is-success mt-2">Cancel</button>
  </div>
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