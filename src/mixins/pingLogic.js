const Monitor = require('ping-monitor')

export default {
  created() {
    if (this.remote.monitoring) {
      this.createMonitor()
    }
  },
  destroyed() {
    this.destroyMonitor()
  },
  methods: {
    createMonitor() {

      this.monitor = new Monitor({
        website: this.remote.uri,
        interval: this.remote.interval / 60,
        method: 'GET'
      })

      const audio = {
        up: new Audio('public/audio/just-like-magic.ogg'),
        error: new Audio('public/audio/you-wouldnt-believe.ogg')
      }

      let notifications = {
        up: null,
        down: null
      }

      this.monitor.on('up', res => {
        console.log(`${this.remote.alias} is up!`)
        this.currentStatus = 'online'

        if (!notifications.up && this.$store.state.settings.notifications) {
          notifications.up = new Notification(`${this.remote.alias} is up!`, {
            body: '\n \n Health endpoint is responding.'
          })

          notifications.up.onshow = () => {
            if (this.$store.state.settings.sounds) {
              audio.up.play()
            }
            notifications.down = null
          }
        }
      })

      this.monitor.on('down', res => {
        console.warn(`${this.remote.alias} is down :(`, res)
        this.currentStatus = this.monitor ? 'offline' : '-'

        if (!notifications.down && this.$store.state.settings.notifications) {
          notifications.down = new Notification(
            `${this.remote.alias} is offline.`,
            {
              body: 'No response from the health endpoint.'
            }
          )

          notifications.down.onshow = () => {
            if (this.$store.state.settings.sounds) {
              audio.error.play()
            }
            notifications.up = null
          }
        }
      })
    },
    destroyMonitor() {
      if (this.monitor) {
        this.monitor.stop()
        delete this.monitor
        this.currentStatus = '-'
      }
    }
  },
  watch: {
    remote(newValue, oldValue) {
      if (
        newValue.uri !== oldValue.uri ||
        newValue.interval !== oldValue.interval
      ) {
        this.destroyMonitor()
        if (this.remote.monitoring) {
          this.createMonitor()
        }
      }
    }
  }
}
