import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Web3ContextProvider } from './context/Web3Context.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastProvider } from '@context/ToastContext.tsx'

const documentRoot = document.getElementById('root');

if(!documentRoot) throw new Error("Root element not found");

// Envuelve toda la app con los providers necesarios. Este es el punto de entrada
createRoot(documentRoot).render(
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
