import Login from '../containers/login/Login'
import Dashboard from '../layouts/Dashboard/Dashboard'
import NotFound from '../containers/misc/NotFound'

export const clientPublicRoutes = [
  {
    path: '/login',
    component: Login
  }
]

export const clientPrivateRoutes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    component: NotFound
  }
]
