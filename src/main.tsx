import React from 'react'
import ReactDOM from 'react-dom/client'
import "virtual:uno.css"
import { createRouter } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import "./index.css"
import '@unocss/reset/tailwind.css'

const router = createRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
