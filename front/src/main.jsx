import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './assets/css/styles.css'
import { AuthProvider } from './pages/Auth/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)