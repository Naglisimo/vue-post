
import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
