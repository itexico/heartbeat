export const storeDef = {
  state: {
    remotesList: [
      {
        _id: 0,
        alias: 'my alias 1',
        uri: 'http://localhost:9090',
        interval: 10
      },
      {
        _id: 1,
        alias: 'my alias 2',
        uri: 'http://localhost:9091',
        interval: 14
      },
      {
        _id: 2,
        alias: 'my alias 3',
        uri: 'http://localhost:9092',
        interval: 12
      },
      {
        _id: 3,
        alias: 'my alias 4',
        uri: 'http://localhost:9093',
        interval: 10
      }
    ]
  },
  getters: {
    allRemotes: state => state.remotesList,
    remote: (state, getters) => id =>
      state.remotesList.find(({ _id }) => _id === +id)
  },
  actions: {},
  mutations: {
    saveRemote: (state, remote) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === remote._id)

      remote.uri = !remote.uri.startsWith('http://')
        ? `http://${remote.uri}`
        : remote.uri

      if (index >= 0) {
        state.remotesList[index] = remote
      } else {
        remote._id = Date.now()
        state.remotesList.unshift(remote)
      }
    },
    deleteRemote: (state, id) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === id)
      state.remotesList.splice(index, 1)
    }
  }
}
