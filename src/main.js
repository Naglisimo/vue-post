
import Vue from 'vue'
import router from './router'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUserSecret, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faPlusCircle)
// library.add(faAmazon)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
