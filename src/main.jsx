import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthContext";
import { WatchlistProvider } from "./Context/WatchlistContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <WatchlistProvider>
    <App />
    </WatchlistProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
