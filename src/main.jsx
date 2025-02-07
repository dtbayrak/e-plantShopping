import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'
import store from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
