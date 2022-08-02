<template>
    <div class="container auto">
      <NoPosts>
        <template v-slot:errorCode>404!</template>
        <template v-slot:text>It seems like we couldn't found what you're looking for, <router-link :to="{ name: 'home' }"> let's go back!</router-link></template>
      </NoPosts>
    </div>
</template>

<script>
import NoPosts from '@/components/NoPosts.vue';
export default {
  components: {
    NoPosts
  }
}
</script>