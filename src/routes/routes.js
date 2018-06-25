import Login from '../containers/login/Login'
import Home from '../containers/home/Home'
import NotFound from '../containers/misc/NotFound'

export const clientPublicRoutes = [
  {
    path: '/login',
    component: Login
  }
]

export const clientPrivateRoutes = [
  {
    path: '/home',
    component: Home
  },
  {
    component: NotFound
  }
]
