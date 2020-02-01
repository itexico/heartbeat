const Datastore = require('nedb')
const db = {}

const path = require('path')
const fsPromises = require('fs').promises

const filePaths = {
  dbPath: path.join(nw.App.dataPath, 'remotes.db'),
  settingsFile: path.join(nw.App.dataPath, 'settings.json')
}

db.remotes = new Datastore({
  filename: filePaths.dbPath,
  autoload: true,
  onload: err => {
    if (err) {
      console.error('Error while loading the db!', err)
    }
  },
  timestampData: true
})

export const storeDef = {
  state: {
    settings: {
      interval: '12',
      notifications: true,
      sounds: true
    },
    remotesList: []
  },
  getters: {
    allRemotes: state => state.remotesList,
    remote: state => id => state.remotesList.find(({ _id }) => _id === id)
  },
  actions: {
    storeRemote({ commit }, remote) {
      return new Promise((resolve, reject) => {
        let callback = (err, newRemote, updatedRemote) => {
          if (err) {
            console.error(err)
            reject(err)
          }
          const remoteToBeSaved = updatedRemote ? updatedRemote : newRemote
          commit('saveRemote', remoteToBeSaved)

          resolve()
        }

        remote.uri = !remote.uri.startsWith('http://')
          ? `http://${remote.uri}`
          : remote.uri

        if (remote._id) {
          db.remotes.update(
            { _id: remote._id },
            remote,
            { returnUpdatedDocs: true },
            callback
          )
        } else {
          db.remotes.insert(remote, callback)
        }
      })
    },
    removeRemote({ commit }, _id) {
      return new Promise((resolve, reject) => {
        db.remotes.remove({ _id: _id }, {}, err => {
          if (err) {
            console.error(err)
            reject(err)
          }
          commit('deleteRemote', _id)
          resolve()
        })
      })
    },
    storeSettings({ commit }, settings) {
      return fsPromises
        .writeFile(filePaths.settingsFile, JSON.stringify(settings, null, 2))
        .then(
          () => {
            commit('updateSettings', settings)
          },
          err => console.error('There was an error while writing the file :(')
        )
    },
    loadSettings({ commit, state, dispatch }) {
      return fsPromises.readFile(filePaths.settingsFile).then(
        data => {
          let settings =
            typeof data !== 'undefined'
              ? JSON.parse(data.toString())
              : state.settings

          commit('updateSettings', settings)
          return settings
        },
        err => {
          if (err.code === 'ENOENT') {
            console.warn('No settings file found, creating one...')
            dispatch('storeSettings', state.settings)
          }
        }
      )
    },
    loadRemotes({ commit }) {
      return new Promise((resolve, reject) => {
        db.remotes.find({}, (err, result) => {
          if (err) {
            reject(err)
          }
          commit('loadRemotes', result)
          resolve()
        })
      })
    }
  },
  mutations: {
    loadRemotes: (state, remotesList) => {
      state.remotesList = remotesList
    },
    saveRemote: (state, remote) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === remote._id)

      if (index >= 0) {
        state.remotesList.splice(index, 1, remote)
      } else {
        state.remotesList.unshift(remote)
      }
    },
    deleteRemote: (state, id) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === id)
      state.remotesList.splice(index, 1)
    },
    updateSettings: (state, settings) => {
      state.settings = settings
    }
  }
}
