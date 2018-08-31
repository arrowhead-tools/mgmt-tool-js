// @material-ui/icons
import Description from '@material-ui/icons/Description'
import CloudQueue from '@material-ui/icons/CloudQueue'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Backup from '@material-ui/icons/Backup'
import List from '@material-ui/icons/List'
import Fingerprint from '@material-ui/icons/Fingerprint'
import SdCard from '@material-ui/icons/SdCard'
import EventNote from '@material-ui/icons/EventNote'
import StorageIcon from '@material-ui/icons/Storage'

// core components/views
import RelayPage from '../containers/relay/Relay'
import GatekeeperPage from '../containers/gatekeeper/Gatekeeper'
import OrchestratorPage from '../containers/orchestrator/Orchestrator'
import OechestrationStorePage from '../containers/orch_store/OrchStore'
import ServiceRegistryPage from '../containers/service_registry/ServiceRegistry'
import DashboardPage from '../components/Dashboard/Dashboard'


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
    sidebarName: 'Orchestration Status',
    navbarName: 'Orchestration Status',
    icon: DeviceHub,
    component: OrchestratorPage
  },
  {
    path: '/store',
    sidebarName: 'Orchestration Store',
    navbarName: 'Orchestration Store',
    icon: StorageIcon,
    component: OechestrationStorePage
  },
  {
    path: '/gatekeeper',
    sidebarName: 'Gatekeeper',
    navbarName: 'Gatekeeper',
    icon: CloudQueue,
    component: GatekeeperPage
  },
  {
    path: '/relay',
    sidebarName: 'Relay',
    navbarName: 'Relay',
    icon: Backup,
    component: RelayPage
  },
  {
    path: '/authorization',
    sidebarName: 'Authorization',
    navbarName: 'Authorization',
    icon: Fingerprint,
    component: DashboardPage
  },
  {
    path: '/eventhandler',
    sidebarName: 'Event Handler',
    navbarName: 'Event Handler',
    icon: EventNote,
    component: DashboardPage
  },
  {
    path: '/sysregistry',
    sidebarName: 'System Registry',
    navbarName: 'System Registry',
    icon: List,
    component: DashboardPage
  },
  {
  path: '/devregistry',
    sidebarName: 'Device Registry',
    navbarName: 'Device Registry',
    icon: SdCard,
    component: DashboardPage
  },
  
  { redirect: true, path: '/', to: '/registry', navbarName: 'Redirect' }
]

export default dashboardRoutes
