import Dashboard from '../layouts/Dashboard/Dashboard'
import KeycloakLogin from '../containers/keycloak/KeycloakLogin'

export const dashboardRoutes = [
  {
    path: '/',
    component: Dashboard
  }
]

export const clientPublicRoutes = [
  {
    path: '/login',
    component: KeycloakLogin
  }
]
