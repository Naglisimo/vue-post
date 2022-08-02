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
      <slot name="author"></slot>
      <time datetime="2016-1-1">
        <slot name="time"></slot>
      </time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Read</a>
    <a href="#" class="card-footer-item" @click="$emit('openModal', id)">Edit</a>
    <a href="#" class="card-footer-item" @click="$emit('openConfirmModal', id)">Delete</a>
  </footer>
</div>
</div>
</template>

<script>


export default {
  props: [ 'id' ]
}
</script>
