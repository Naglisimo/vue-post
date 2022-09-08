<template>
<div>
<div class="card">
  <header class="card-header">
    <p class="card-header-title is-size-2">
      <slot name="title"></slot>
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      <p class="is-size-5"><slot v-if="path !== '/'" name="body" ></slot></p>
      <br>
      <p class="is-size-4">Written by</p>
      <p class="is-size-5"><slot name="author"></slot></p>
      <time datetime="2016-1-1">
        <p class="is-size-5"><slot name="time"></slot></p>
      </time>
    </div>
  </div>
  <footer class="card-footer">
    <router-link v-if="path !== '/'" :to="{ name: 'home'}" class="card-footer-item is-size-5">Back</router-link>
    <router-link v-else :to="{ name: 'post', params: { id: id }}" class="card-footer-item is-size-5">Read</router-link>
    <a class="card-footer-item is-size-5" @click="$emit('openAddEdit', id)">Edit</a>
    <a class="card-footer-item is-size-5" @click="$emit('openConfirmModal', id)">Delete</a>
  </footer>
</div>

</div>
</template>

<script>

export default {
  props: [ 'id' ],
  data () {
    return {
      path: '',
      isNotificationOpen: false,
    }
  },
  created () {
    this.path = this.$route.path
  }
}
</script>
