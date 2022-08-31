<template>
<div class="modal" :class="modalClass">
    <!-- Any other Bulma elements you want -->
<div :class='type'>
  <slot name="text"></slot>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      modalClass: String,
      type: String
    }
  }
</script>

<style scoped>
.modal {
  justify-content: flex-end;
  align-items: flex-end;
  margin: 20px;
}
</style>