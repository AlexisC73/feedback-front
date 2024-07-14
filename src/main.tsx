import "reflect-metadata"
import React from 'react'
import ReactDOM from 'react-dom/client'
import "virtual:uno.css"
import { createRouter } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import "@/index.css"
import '@unocss/reset/tailwind.css'
import { Provider } from 'react-redux'
import { createStore } from './store/store.ts'
import { SortFilterCtxProvider } from './Context/SortFilter/SortFilter.tsx'
import { TagFilterCtxProvider } from './Context/TagFilter/TagFilterCtx.tsx'
import { createContainer } from "./injection/container.ts"
import { ToastContextProvider } from "./Context/ToastCtx/ToastCtx.tsx"

const store = createStore(createContainer())

const router = createRouter({store})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <TagFilterCtxProvider>
          <SortFilterCtxProvider>
            <RouterProvider router={router} />
          </SortFilterCtxProvider>
        </TagFilterCtxProvider>
      </ToastContextProvider>
    </Provider>
  </React.StrictMode>,
)
