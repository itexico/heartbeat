import RemotesList from './components/RemotesList'
import RemoteForm from './components/RemoteForm'

export const routes = [
  { path: '', component: RemotesList },
  { path: '/remote', component: RemoteForm }
]
