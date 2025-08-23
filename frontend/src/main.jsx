import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' 
import { BrowserRouter } from 'react-router-dom' // multiple page - adding support of react-router-dom 
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <AppContextProvider>
      <App />
    </AppContextProvider>   
  </BrowserRouter>,
)
