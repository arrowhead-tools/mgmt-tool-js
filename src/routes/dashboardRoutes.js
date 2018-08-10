// @material-ui/icons
import Description from '@material-ui/icons/Description'
import CloudQueue from '@material-ui/icons/CloudQueue'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Backup from '@material-ui/icons/Backup'
// core components/views
import BrokerPage from '../containers/broker/Broker'
import GatekeeperPage from '../containers/gatekeeper/Gatekeeper'
import OrchestratorPage from '../containers/orchestrator/Orchestrator'
import ServiceRegistryPage from '../containers/service_registry/ServiceRegistry'


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
    component: OrchestratorPage
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
