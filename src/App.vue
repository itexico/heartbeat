<template>
  <v-app dark>
    <v-toolbar
      style="-webkit-app-region: drag;"
      dark
      fixed
      dense
      v-if="!settingsDialog"
    >
      <v-toolbar-title>Heartbeat</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn style="webkit-app-region: no-drag" icon @click="closeWindow()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <main>
      <v-container fluid class="pa-0">
        <keep-alive include="theList">
          <router-view></router-view>
        </keep-alive>
      </v-container>

      <hb-settings-dialog
        v-if="defaultValues"
        :defaults="defaultValues"
        :dialog.sync="settingsDialog"
      ></hb-settings-dialog>
    </main>

    <v-footer :fixed="true">
      <v-btn icon @click="settingsDialog = true" :disabled="!defaultValues">
        <v-icon class="grey--text text-darken-3">settings</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn fab top right absolute class="accent" @click="add">
        <v-icon>add</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import HbRemotesList from './components/RemotesList.vue'
import HbSettingsDialog from './components/SettingsDialog.vue'

let win = nw.Window.get()

export default {
  components: {
    HbRemotesList,
    HbSettingsDialog
  },
  created() {
    this.$store.dispatch('loadRemotes')
    this.$store
      .dispatch('loadSettings')
      .then(settings => (this.defaultValues = settings))
    // on the packed app, we need to make sure we go here on load
    this.$router.push('/')
  },
  data() {
    return {
      settingsDialog: false,
      defaultValues: null
    }
  },
  methods: {
    add() {
      this.$router.push('/remote')
    },
    closeWindow() {
      win.close()
    }
  }
}
</script>

<style lang="stylus">
@import './stylus/main';

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>
