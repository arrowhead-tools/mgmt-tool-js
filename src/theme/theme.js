import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'typeface-roboto'

const primaryColor = '#004676'
const errorColor = '#d50000'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor,
    accent1Color: primaryColor
  },

  textField: {
    errorColor
  },
  raisedButton: {
    primaryColor,
    textColor: 'rgba(255, 255, 255, 0.87)'
  },
  typography: {
    align: 'center'
  },
  button: {
    primaryColor
  }

})

export default muiTheme
