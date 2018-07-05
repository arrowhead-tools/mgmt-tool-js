// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import ContentPaste from '@material-ui/icons/ContentPaste'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
// core components/views
import DashboardPage from '../components/Dashboard/Dashboard'

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/registry',
    sidebarName: 'Service Registry',
    navbarName: 'Service Registry',
    icon: Person,
    component: DashboardPage
  },
  {
    path: '/item2',
    sidebarName: 'Item2',
    navbarName: 'Item2',
    icon: ContentPaste,
    component: DashboardPage
  },
  {
    path: '/item3',
    sidebarName: 'Item3',
    navbarName: 'Item3',
    icon: LibraryBooks,
    component: DashboardPage
  },
  {
    path: '/item4',
    sidebarName: 'Item4',
    navbarName: 'Item4',
    icon: BubbleChart,
    component: DashboardPage
  },
  {
    path: '/item5',
    sidebarName: 'Item5',
    navbarName: 'Item5',
    icon: LocationOn,
    component: DashboardPage
  },
  {
    path: '/item6',
    sidebarName: 'Item6',
    navbarName: 'Item6',
    icon: Notifications,
    component: DashboardPage
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
]

export default dashboardRoutes
