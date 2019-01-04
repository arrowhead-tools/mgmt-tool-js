import React from 'react'
import ReactDOM from 'react-dom'
import './theme/index.css'
import App from './containers/app/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'
import muiTheme from './theme/theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
