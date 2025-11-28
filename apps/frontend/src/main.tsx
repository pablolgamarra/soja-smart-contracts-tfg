import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Web3ContextProvider } from './context/Web3Context.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastProvider } from '@context/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3ContextProvider>
        <ToastProvider>
            <Router>
                <App />
            </Router>
        </ToastProvider>
    </Web3ContextProvider>
  </StrictMode>,
)
