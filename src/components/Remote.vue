<template>
  <v-list-tile avatar>

    <v-list-tile-avatar>
      <transition name="fade">
        <v-icon class="white--text" :class="icon.classes">{{icon.name}}</v-icon>
      </transition>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title> {{remote.alias}} </v-list-tile-title>
      <v-list-tile-sub-title> {{remote.uri}} </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout>
        <v-switch v-model="remote.monitoring" color="primary" @change="toggleMonitor"></v-switch>
        <v-menu>
          <v-btn icon slot="activator" class="ml-2">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :to="{ path: `remote/${remote._id}`}">
              <v-list-tile-title>Edit</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="removeRemote( remote._id )">
              <v-list-tile-title>Remove</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-list-tile-action>

  </v-list-tile>
</template>

<script>
import Monitor from '../mixins/pingLogic'
export default {
  mixins: [Monitor],
  props: {
    remote: {
      type: Object,
      default() {
        return {
          alias: '',
          uri: '',
          status: '-',
          _id: '',
          interval: 0,
          monitoring: true
        }
      }
    }
  },
  methods: {
    removeRemote(id) {
      this.$store.commit('deleteRemote', id)
    },
    toggleMonitor() {
      if (this.remote.monitoring) {
        this.createMonitor()
      } else {
        this.currentStatus = '-'
        this.destroyMonitor()
      }
    }
  },
  data() {
    return {
      currentStatus: this.remote.status
    }
  },
  computed: {
    icon() {
      const iconsMap = {
        '-': {
          name: 'report_problem',
          classes: ['grey', 'lighten-2']
        },
        online: {
          name: 'swap_vert',
          classes: ['light-green', 'darken-1']
        },
        offline: {
          name: 'not_interested',
          classes: ['red', 'darken-1']
        }
      }

      return iconsMap[this.currentStatus || '-']
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
