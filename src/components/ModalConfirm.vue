<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <h1>here is my text and what I think about this project {{ id }}</h1>
      <button @click="deletePost(id)">Delete</button>
      <button @click="$emit('closeModal')">Cancel</button>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closeModal', false)"></button>
  </div>
</template>

<script>
import { deletePostMixin } from '../mixins/fetchPostMixin'

  export default {
    props: {
      id: Number
    },
    mixins: [deletePostMixin],
  }
</script>

<style lang="scss" scoped>

</style>