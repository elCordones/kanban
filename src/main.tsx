/**
 * Projecte Kanban Alumnes
 * Author: David Cordones
 * Year: 2025
 * License: AGPL v3
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
