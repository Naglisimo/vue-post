<template>
  <div class="container is-fluid">
    posts page
    
    <ModalAddEdit 
      :class="[ isEditOpen ? 'is-active' : '']"
      :id="selectedID"
      @closeModal="toggleOpenEdit(false)"
      @deletePost="deletePost($event)"
      @fetchData="fetchMethod()"
      @alertPrimary="openNotificationPrimary($event)"
      @alertDanger="openNotificationDanger($event)"/>
        <div class=" navbar level notification is-size-5 is-primary is-fixed-top">
        <div>
          <button 
            class="button is-info is-light"
            @click="toggleOpenEdit(0, true)"> Add new post </button>
        </div>
        <div class="field has-addons ">
          <p class="control">
            <input @onChange="search" class="input" type="text" placeholder="Find a post" v-model="searchInput">
          </p>
          <p class="control">
            <button class="button" @click="search">
              Search
            </button>
          </p>
        </div>
      </div>
          <NotificationConfirm 
          :class="isNotificationOpen ? 'is-active' : ''"
          :id="selectedID"
          @closeConfirmModal="toggleNotification($event, false)"
          @deletePost="deletePost($event, currentPage)"
          />
          <NotificationInfo
          :modalClass="deleteNotification ? 'is-active' : ''"
          :type="isInfoPrimary ? 'notification is-primary' : 'notification is-danger'">
          <template v-slot:text> {{ notificationText }} </template>
          </NotificationInfo>
          <NotificationInfo
          :modalClass="addEditNotification ? 'is-active' : ''"
          :type="isInfoPrimary ? 'notification is-primary' : 'notification is-danger'">
          <template v-slot:text> {{ notificationText }} </template>
          </NotificationInfo>
        <div class="section mt-6">
          <template v-if="posts.length">
          <PostSummary v-for="post in posts"
          :id="post.id"
          :key="post.id" 
          @openConfirmModal="toggleNotification($event, true)"
          @openAddEdit="toggleOpenEdit($event, true)"
          
          >
            <template v-slot:title>
              {{post.title}}
            </template>
            <template v-slot:author>
              {{post.author}}
            </template>
            <template v-slot:time>
              {{post.updated_at ? post.updated_at : post.created_at}}
            </template>
            </PostSummary>
            <nav class="pagination is-centered mt-3" role="navigation" aria-label="pagination">
              <a v-if="currentPage > 1" class="pagination-previous" @click="prevNext(currentPage--)">Previous</a>
              <a v-if="currentPage < totalPagesArray.length" class="pagination-next" @click="prevNext(currentPage++)">Next page</a>
              <ul class="pagination-list">
                <li v-for="page in totalPagesArray" v-bind:key=page><a class="pagination-link" :class="[page == currentPage ? 'is-current' : '']" @click="toPage(page)" aria-label="Goto page ">{{page}}</a></li>
              </ul>
            </nav>
          </template>
          <template v-else>
            <NoPosts>
              <template v-slot:text>
                There is no available posts, <router-link :to="{ name: 'home' }"> let's go back!</router-link>
              </template>
            </NoPosts>
          </template>
        </div>
  </div>
</template>

<script>
import EventService from '../services/EventService'
import PostSummary from '../components/PostSummary'
  import NoPosts from '../components/NoPosts'
  import ModalAddEdit from '@/components/ModalAddEdit'
  import NotificationConfirm from '@/components/NotificationConfirm'
  import NotificationInfo from '@/components/NotificationInfo'
  import { fetchPostsMixin, deletePostMixin, notificationMixin } from '../mixins/fetchPostMixin'
  import { library } from '@fortawesome/fontawesome-svg-core'

  import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

  library.add(faHatWizard)

  export default {
    components: {
      PostSummary,
      NoPosts,
      ModalAddEdit,
      NotificationConfirm,
      NotificationInfo
    },
    mixins: [fetchPostsMixin, deletePostMixin, notificationMixin],
    props: {
      prop: String
    },
    data () {
      return {
        posts: [],
        searchInput: '',
        selectedID: 0,
        isNotificationOpen: false,
        isEditOpen: false,
        notificationText: '',
        currentPage: 1,
        activePage: 0
      }
    },
    methods: {
      prevNext () {
        this.toPage(this.currentPage)
      },
      toPage (page) {
        this.currentPage = page
        this.fetchMethod(page)
      },
      search () {
        EventService.searchEvents(this.searchInput)
        .then(res => { this.posts = res.data })
        .catch(err => console.log(err))
      },
      toggleOpenEdit(event, boolean) {
        console.log('posts', this.posts)
        console.log(event, 'event', boolean, 'bool')
        if (event) {
        this.selectedID = event
        this.isEditOpen = boolean
        } else {
        this.selectedID = 0
        this.isEditOpen = boolean
        }
    },
      toggleNotification (event, boolean) {
        console.log('click', event, boolean)
        this.isNotificationOpen = boolean
        this.selectedID = event
      }
    },
    created () {
      this.fetchMethod(this.currentPage)
      console.log('props are', this.prop)
    }
  }
  </script>
