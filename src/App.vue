<template>
  <v-app dark>
    <v-toolbar dark fixed dense>
      <v-toolbar-title>Heartbeat</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>close</v-icon>
      </v-btn>

    </v-toolbar>

    <main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </main>

    <v-footer :fixed="true">

      <v-btn icon>
        <v-icon class="grey--text text-darken-3">settings</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn fab top right absolute class="accent">
        <v-icon>add</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import HbRemotesList from './components/RemotesList.vue'
export default {
  components: {
    HbRemotesList
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
@import './stylus/main';
</style>
