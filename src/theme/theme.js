import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'typeface-roboto'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#004676",
        accent1Color:"#004676",
    },
    
    textField: {
        errorColor: "#d50000"
    },
    raisedButton: {
        primaryColor: "#004676",
        textColor: "rgba(255, 255, 255, 0.87)",
    },
    typography: {
        align: 'center',
    },
    button: {
        primaryColor: "#004676",  
    }
    
});

export default muiTheme;