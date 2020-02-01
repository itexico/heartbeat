<template>
  <v-dialog
    v-model="internalDialog"
    fullscreen
    :overlay="false"
    transition="dialog-bottom-transition"
    @keydown.esc="close()"
  >
    <v-card>
      <v-toolbar style="-webkit-app-region: drag;" dark class="secondary">
        <v-btn style="webkit-app-region: no-drag" icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            style="webkit-app-region: no-drag"
            dark
            flat
            @click="saveSettings()"
            >Save</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-list three-line subheader>
          <v-subheader>Global settings</v-subheader>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Ping interval</v-list-tile-title>
              <v-list-tile-sub-title
                >Set the interval between pings in
                seconds</v-list-tile-sub-title
              >
            </v-list-tile-content>
            <v-text-field
              name="pingInterval"
              id="pingInt"
              suffix="s"
              v-model="settings.interval"
            ></v-text-field>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title
                >Display notifications when detecting a change in
                status</v-list-tile-sub-title
              >
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox
                v-model="settings.notifications"
                color="primary"
              ></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title
                >Play a sound alongside the notification</v-list-tile-sub-title
              >
              <small
                >(Note that notifications should be enabled if you want to
                change this)</small
              >
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox
                v-model="settings.sounds"
                :disabled="!settings.notifications"
                color="primary"
              ></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dialog: Boolean,
    defaults: Object
  },
  data() {
    return {
      originalSettings: { ...this.defaults },
      settings: { ...this.defaults }
    }
  },
  computed: {
    internalDialog() {
      return this.dialog
    }
  },
  methods: {
    close(afterSave = false) {
      this.$emit('update:dialog', false)
      if (!afterSave) {
        this.settings = { ...this.originalSettings }
      }
    },
    saveSettings() {
      this.$store.dispatch('storeSettings', this.settings).then(() => {
        this.originalSettings = { ...this.settings }
        this.close(true)
      })
    }
  }
}
</script>
