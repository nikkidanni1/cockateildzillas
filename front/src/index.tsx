import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import './index.css'
import './fonts.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js',
        {
          scope: './',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  </Provider>
)

registerServiceWorker()
reportWebVitals()
