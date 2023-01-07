import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import './index.css'
import './fonts.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
