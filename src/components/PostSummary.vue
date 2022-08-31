<template>
<div>
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
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
      <slot v-if="path !== '/'" name="body"></slot>
      <slot name="author"></slot>
      <time datetime="2016-1-1">
        <slot name="time"></slot>
      </time>
    </div>
  </div>
  <footer class="card-footer">
    <router-link v-if="path !== '/'" :to="{ name: 'home'}" class="card-footer-item">Back</router-link>
    <router-link v-else :to="{ name: 'post', params: { id: id }}" class="card-footer-item">Read</router-link>
    <a href="#" class="card-footer-item" @click="$emit('openAddEdit', id)">Edit</a>
    <a href="#" class="card-footer-item" @click="$emit('openConfirmModal', id)">Delete</a>
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
    console.log('created post summary with id', this.id)
  }
}
</script>
