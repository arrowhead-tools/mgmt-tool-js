// @material-ui/icons
import Description from '@material-ui/icons/Description'
import CloudQueue from '@material-ui/icons/CloudQueue'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Backup from '@material-ui/icons/Backup'
// core components/views
import DashboardPage from '../components/Dashboard/Dashboard'
import ServiceRegistryPage from '../containers/service_registry/ServiceRegistry'
import GatekeeperPage from '../containers/gatekeeper/Gatekeeper'
import BrokerPage from '../containers/broker/Broker'


const dashboardRoutes = [
  {
    path: '/registry',
    sidebarName: 'Service Registry',
    navbarName: 'Service Registry',
    icon: Description,
    component: ServiceRegistryPage
  },
  {
    path: '/orch',
    sidebarName: 'Orchestrator',
    navbarName: 'Orchestrator',
    icon: DeviceHub,
    component: DashboardPage
  },
  {
    path: '/gatekeeper',
    sidebarName: 'Gatekeeper',
    navbarName: 'Gatekeeper',
    icon: CloudQueue,
    component: GatekeeperPage
  },
  {
    path: '/broker',
    sidebarName: 'Broker',
    navbarName: 'Broker',
    icon: Backup,
    component: BrokerPage
  },
  
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
]

export default dashboardRoutes
