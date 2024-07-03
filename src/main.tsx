import React from 'react'
import ReactDOM from 'react-dom/client'
import "virtual:uno.css"
import { createRouter } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import "@/index.css"
import '@unocss/reset/tailwind.css'
import { Provider } from 'react-redux'
import { createStore } from './store/store.ts'

const router = createRouter()
const store = createStore({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
