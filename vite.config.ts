/**
 * Projecte Kanban Alumnes
 * Author: David Cordones
 * Year: 2025
 * License: AGPL v3
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Utilitzem './' per a que els camins siguin relatius i funcioni a GitHub Pages
  base: './',
})
