import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {
  Vuetify,
  VApp,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VToolbar,
  VGrid,
  VSubheader,
  VAvatar,
  VMenu,
  VSwitch,
  VCard,
  VTextField,
  VProgressLinear,
  transitions,
  VDialog,
  VCheckbox
} from 'vuetify'

import { routes } from './routes'
import { storeDef } from './store'
import App from './App.vue'

Vue.use(Vuetify, {
  components: {
    VApp,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VToolbar,
    VGrid,
    VSubheader,
    VAvatar,
    VMenu,
    VSwitch,
    VCard,
    VTextField,
    VProgressLinear,
    transitions,
    VDialog,
    VCheckbox
  }
})

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes,
  mode: 'history'
})

const store = new Vuex.Store(storeDef)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
