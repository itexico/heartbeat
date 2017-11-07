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
        <hb-remotes-list></hb-remotes-list>
      </v-container>
    </main>

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
