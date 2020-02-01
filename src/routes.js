import RemotesList from './components/RemotesList'
import RemoteForm from './components/RemoteForm'

export const routes = [
  { path: '', component: RemotesList },
  { path: '/', component: RemotesList },
  { path: '/remote', component: RemoteForm },
  { path: '/remote/:id', component: RemoteForm, props: true }
]
