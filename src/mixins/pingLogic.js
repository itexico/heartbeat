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
        interval: this.remote.interval / 60
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

        if (!notifications.up) {
          notifications.up = new Notification(`${this.remote.alias} is up!`, {
            body: '\n \n Health endpoint is responding.'
          })

          notifications.up.onshow = () => {
            audio.up.play()
          }
        }
      })

      let downCallback = res => {
        console.warn(`${this.remote.alias} is down :(`, res)
        this.currentStatus = 'offline'

        if (!notifications.down) {
          notifications.down = new Notification(
            `${this.remote.alias} is offline.`,
            {
              body: 'No response from the health endpoint.'
            }
          )

          notifications.down.onshow = () => {
            audio.error.play()
          }
        }
      }

      this.monitor.on('down', downCallback)
      this.monitor.on('error', downCallback)
    },
    destroyMonitor() {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = null
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
