import Vue from 'vue'
import App from './App.vue'
import store from './store'

if (process.env.NODE_ENV === 'development') {
  require('./miragejs/server').makeServer()
}

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
