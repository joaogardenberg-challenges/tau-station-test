import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Providers from 'providers'
import Routes from 'components/Routes'
import reportWebVitals from './reportWebVitals'
import './index.scss'

ReactDOM.render(
  <Providers>
    <CssBaseline />
    <Routes />
  </Providers>,
  document.getElementById('tau-station')
)

reportWebVitals()
