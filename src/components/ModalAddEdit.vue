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
  <label class="label">Post title {{ id }}</label>
  <div class="control">
    <input 
      class="input"
      :class="{ 'has-background-danger-light': $v.title.$error }"
      type="text"
      placeholder="Post title"
      v-model="title"
      @blur="$v.title.$touch()">
    <div v-if="$v.title.$error">
    <p v-if="!$v.title.required" class="has-text-danger">Post title is required</p>
    </div>
  </div>
</div>
<div class="field" v-if="!id">
  <label class="label">Author</label>
  <div class="control">
    <input
      class="input"
      :class="{ 'has-background-danger-light': $v.author.$error }"
      type="text"
      placeholder="Author name"
      v-model="author"
      @blur="$v.author.$touch()">
    <div v-if="$v.author.$error">
    <p v-if="!$v.author.required" class="has-text-danger">Post title is required</p>
    </div>
  </div>
</div>
<div class="field">
  <label class="label">Post</label>
  <div class="control">
    <input
      class="textarea"
      :class="{ 'has-background-danger-light': $v.postBody.$error }"
      type="textarea"
      v-model="postBody"
      @blur="$v.postBody.$touch()">
    <div v-if="$v.postBody.$error">
    <p v-if="!$v.postBody.required" class="has-text-danger">Post title is required</p>
    </div>
  </div>
</div>


    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        @click="submitPost"
        :disabled="$v.$invalid">Save post</button>
      <button class="button" @click="$emit('closeModal')">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { addEditPostMixin } from '../mixins/fetchPostMixin'
import EventService from '../services/EventService'

  export default {
    props: {
      id: [Number, String]
    },
    mixins: [addEditPostMixin],
    data () {
      return {
        isEditing: false,
          title: '',
          author: '',
          postBody: '',
        email: null
      }
    },
    watch: {
      id(newId, oldId) {
        console.log('watcher', newId, oldId)
        if (newId !== oldId && newId) {
          EventService.fetchEvent(this.id).then( ({data}) => {
          this.title = data.title
          this.author = data.author
          this.postBody = data.body
          })
        }
      }
    },
    validations: {
        title: {
          required
        },
        author: {
          required
        },
        postBody: {
          required
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>