<template>
<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ id ? "Edit post" : "Add new post"}}</p>
      <button class="delete" aria-label="close" @click="$emit('closeModal')"></button>
    </header>
    <section class="modal-card-body">

<div class="field">
  <label class="label">Post title</label>
  <div class="control">
    <input class="input" type="text" placeholder="Post title" v-model="formInputs.title">
  </div>
</div>
<div class="field" v-if="!id">
  <label class="label">Author</label>
  <div class="control">
    <input class="input" type="text" placeholder="Author name" v-model="formInputs.author">
  </div>
</div>
<div class="field">
  <label class="label">Post</label>
  <div class="control">
    <input class="textarea" type="textarea" v-model="formInputs.postBody">
  </div>
</div>

    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="submitNewPost">Save post</button>
      <button class="button" @click="$emit('closeModal')">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import { deletePostMixin } from '../mixins/fetchPostMixin'
import EventService from '../services/EventService'

  export default {
    props: {
      id: [Number, String]
    },
    mixins: [deletePostMixin],
    data () {
      return {
        isEditing: false,
        formInputs: {
          title: '',
          author: '',
          postBody: ''
        }
      }
    },
    methods: {
      submitNewPost () {
        const date = new Date()
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDay()}`
        const event = {
          // id: Math.floor(Math.random()*10000),
          title: this.formInputs.title,
          author: this.formInputs.author,
          body: this.formInputs.postBody,
          created_at: formattedDate
        }
        console.log(event)
        EventService.createEvent(event).then(res => console.log(res)).catch(err => console.log(err))
        this.$emit('closeModal')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>