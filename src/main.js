import Vue from 'vue'
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
  transitions
} from 'vuetify'
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
    transitions
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
